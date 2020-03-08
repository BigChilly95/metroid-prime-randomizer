import { Injectable, NgZone } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ElectronService } from './electron.service';
import { PresetObject } from '../../../../common/models/presetObject';
import { RandomizerForm } from '../../../../common/models/randomizerForm';

@Injectable({
  providedIn: 'root'
})
export class PresetsService {
  private cachedImportedPreset: string;
  private defaultPresets$ = new BehaviorSubject<PresetObject>(undefined);
  private userPresets$ = new BehaviorSubject<PresetObject>(undefined);
  private importedPreset$ = new BehaviorSubject<string>(undefined);
  _defaultPresets = this.defaultPresets$.asObservable();
  _userPresets = this.userPresets$.asObservable();
  _importedPreset = this.importedPreset$.asObservable();

  constructor(private ngZone: NgZone, private electronService: ElectronService, private toastrService: ToastrService) {
    this.getAllPresets();

    this.electronService.ipcRenderer.on('getDefaultPresetsResponse', (event, response: PresetsResponse) => {
      this.ngZone.run(() => {
        this.handlePresetsResponse(response, this.defaultPresets$);
      });
    });

    this.electronService.ipcRenderer.on('getUserPresetsResponse', (event, response: PresetsResponse) => {
      this.ngZone.run(() => {
        // Emit imported preset key if one is provided
        if (this.cachedImportedPreset) {
          this.importedPreset$.next(this.cachedImportedPreset);
          this.cachedImportedPreset = null;
        }

        this.handlePresetsResponse(response, this.userPresets$);
      });
    });

    this.electronService.ipcRenderer.on('updateUserPresetResponse', (event, response) => {
      this.ngZone.run(() => {
        this.getUserPresets();
      });
    });

    this.electronService.ipcRenderer.on('removeUserPresetResponse', (event, response) => {
      this.ngZone.run(() => {
        this.getUserPresets();
      });
    });

    this.electronService.ipcRenderer.on('importPresetResponse', (event, key: string, preset: RandomizerForm) => {
      this.ngZone.run(() => {
        this.cachedImportedPreset = key;
        this.electronService.ipcRenderer.send('updateUserPreset', preset, key);
      });
    });

    this.electronService.ipcRenderer.on('importPresetError', (event, errMsg: string) => {
      this.ngZone.run(() => {
        this.toastrService.error('Failed to import preset: ' + errMsg);
      });
    });

    this.electronService.ipcRenderer.on('exportPresetResponse', (event, errMsg: string) => {
      if (errMsg) {
        this.toastrService.error('Failed to export preset: ' + errMsg);
      } else {
        this.toastrService.success('Successfully exported the preset.');
      }
    });
  }

  getDefaultPresets() {
    this.electronService.ipcRenderer.send('getDefaultPresets');
  }

  getUserPresets() {
    this.electronService.ipcRenderer.send('getUserPresets');
  }

  getAllPresets() {
    this.getDefaultPresets();
    this.getUserPresets();
  }

  addOrUpdatePreset(name: string, preset: RandomizerForm) {
    this.electronService.ipcRenderer.send('updateUserPreset', preset, name);
  }

  removePreset(name: string) {
    this.electronService.ipcRenderer.send('removeUserPreset', name);
  }

  importPreset(): void {
    this.electronService.dialog.showOpenDialog({
      filters: [
        { name: 'Preset Files', extensions: ['json'] }
      ],
      properties: ['openFile']
    }).then(result => {
      if (!result.canceled) {
        this.electronService.ipcRenderer.send('importPreset', result.filePaths[0]);
      }
    });
  }

  exportPreset(key: string) {
    this.electronService.dialog.showSaveDialog({
      title: 'Export Preset',
      filters: [
        { name: 'Preset Files', extensions: ['json'] }
      ]
    }).then(result => {
      if (!result.canceled && result.filePath) {
        this.electronService.ipcRenderer.send('exportPreset', key, result.filePath);
      }
    });
  }

  clearImportPresetSubject(): void {
    this.importedPreset$.next(null);
  }

  private handlePresetsResponse(response: PresetsResponse, subject: Subject<PresetObject>): void {
    // If presets and keys are defined, return the original order the presets were in, otherwise don't do anything
    if (!response.presets) {
      subject.next({});
    } else {
      const finalPresets = response.presets && response.keys ? this.orderPresets(response.presets, response.keys) : response.presets;
      subject.next(finalPresets);
    }
  }

  private orderPresets(presets: PresetObject, keys: string[]): PresetObject {
    const orderedPresets: PresetObject = {};

    for (let key of keys) {
      orderedPresets[key] = presets[key];
    }

    return orderedPresets;
  }
}

interface PresetsResponse {
  err: NodeJS.ErrnoException;
  presets: any;
  keys: string[];
}
