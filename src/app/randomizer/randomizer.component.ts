import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RandomizerService } from '../services/randomizer.service';
import { ElectronService } from '../services/electron.service';
import { RandomizerMode } from '../../../common/randomizer/enums/RandomizerMode';
import { RandomizerLogic } from '../../../common/randomizer/enums/RandomizerLogic';
import { RandomizerArtifacts } from '../../../common/randomizer/enums/RandomizerArtifacts';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-random',
  templateUrl: './randomizer.component.html',
  styleUrls: ['./randomizer.component.scss']
})
export class RandomizerComponent implements OnInit {
  tabs = [
    'ROM Settings',
    'Main Rules',
  ];
  selectedTab = 0;
  patching = false;
  patchUpdate: string;
  errorOccurred: boolean;
  randomizerForm: FormGroup;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private randomizerService: RandomizerService,
    private electronService: ElectronService
  ) { }

  ngOnInit() {
    this.createForm();

    this.electronService.ipcRenderer.on('patch-success', (event, arg) => {
      console.log(arg);
      this.patchUpdate = null;
      this.patching = false;
      this.changeDetectorRef.detectChanges();
      if (!this.errorOccurred) {
        this.electronService.dialog.showMessageBox({
          type: 'info',
          message: 'Game has been successfully patched.'
        });
      }
    });

    this.electronService.ipcRenderer.on('patch-error', (event, arg) => {
      console.log(arg);
      this.patching = false;
      this.errorOccurred = true;
      this.changeDetectorRef.detectChanges();
      this.electronService.dialog.showMessageBox({
        type: 'error',
        title: 'Error',
        message: arg
      });
    });

    this.electronService.ipcRenderer.on('patch-progress', (event, arg) => {
      if (this.patching) {
        this.patchUpdate = arg.percent + ': ' + arg.msg;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  createForm() {
    const fb = new FormBuilder();
    this.randomizerForm = fb.group({
      version: environment.version,
      seed: [''],
      rom: fb.group({
        baseIso: ['', Validators.required],
        outputFolder: [''],
        spoiler: [true],
        createIso: [true]
      }),
      settings: this.setDefaultSettings()
    });
  }

  runRandomizer() {
    this.randomizerService.updateSubmittedFlag(true);
    const game = JSON.parse(JSON.stringify(this.randomizerForm.value));

    if (this.randomizerForm.valid) {
      this.errorOccurred = false;
      this.patching = true;
      this.electronService.ipcRenderer.send('randomizer', game);
    }
  }

  setDefaultSettings() {
    const fb = new FormBuilder();

    return fb.group({
      logic: [RandomizerLogic.NO_GLITCHES],
      mode: [RandomizerMode.STANDARD],
      artifacts: [RandomizerArtifacts.VANILLA],
    });
  }

  resetSettings() {
    this.randomizerForm.patchValue({
      seed: '',
      settings: {
        logic: RandomizerLogic.NO_GLITCHES,
        mode: RandomizerMode.STANDARD,
        artifacts: RandomizerArtifacts.VANILLA,
      }
    });
  }
}
