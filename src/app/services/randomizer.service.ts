import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RandomizerMode } from '../../../common/randomizer/enums/RandomizerMode';
import { RandomizerLogic } from '../../../common/randomizer/enums/RandomizerLogic';
import { RandomizerArtifacts } from '../../../common/randomizer/enums/RandomizerArtifacts';

@Injectable({
  providedIn: 'root'
})
export class RandomizerService {
  private submitted$ = new BehaviorSubject(false);
  private settings = {
    logic: [
      { name: 'No Glitches', value: RandomizerLogic.NO_GLITCHES },
      { name: 'Normal', value: RandomizerLogic.NORMAL },
      { name: 'Hard', value: RandomizerLogic.HARD }
    ],
    mode: [
      { name: 'Standard', value: RandomizerMode.STANDARD },
      { name: 'Major Items', value: RandomizerMode.MAJOR_ITEMS }
    ],
    artifacts: [
      { name: 'Vanilla (Not Randomized)', value: RandomizerArtifacts.VANILLA },
      { name: 'Randomized', value: RandomizerArtifacts.RANDOMIZED }
    ]
  };
  private tooltips = {
    artifactCount: 'Sets the number of Chozo Artifacts for Artifact Collection seeds.',
    barsSkip: 'You can skip traversing through the crashed frigate with a precise ' +
      'double bomb jump over the gate in Great Tree Hall.',
    baseIso: 'NTSC-U 1.00 or 1.02 Metroid Prime ISO file. The PAL, NTSC-J, and Wii versions are not currently supported.',
    dashing: 'When strafe dashing left or right while locked on, you can release your lock-on partway through ' +
      'the dash to leap sideways at high speeds. This can be used to get to item locations earlier than intended. ' +
      'All of the common Any%/100% dashes are accounted for, usually to skip Grapple Beam, Boost Ball, and Spider Ball. ' +
      'The scan dash to Alcove is the only dash you are not expected to also have Space Jump for.\n\n' +
      'Note that Scan Dashing only works on the NTSC-U 1.00 version of the game.',
    damageBoostLiquids: 'You may need to intentionally take damage moving through lava or acid to reach areas ' +
      'or items early, including accessing Magmoor Caverns without Morph Ball, crossing Magma Pool with ' +
      'Gravity Suit, collecting the Watery Hall (Underwater) item before fighting Flaahgra, and double bomb ' +
      'jumping out of the lava in Twin Fires Tunnel to cross the room (with the DBJ sequence breaks setting ' +
      'enabled).',
    dontRequireFlaahgra: 'Both item locations in Sunchamber will never contain any required items.',
    dontRequireOmegaPirate: 'Elite Quarters and Processing Center Access will never contain any required items.',
    dontRequireThardus: 'Quarantine Cave and Quarantine Monitor will never contain any required items.',
    earlyNewborn: 'You can grab the Phazon Mining Tunnel item without any Energy Tanks or Phazon Suit ' +
      'by going out of bounds (usually by Glider clipping in Metroid Quarantine A), infinite boosting ' +
      'into Phazon Mining Tunnel, grabbing the item, and then infinite boosting out. This is a ' +
      'difficult wallcrawl.',
    earlyWild: 'Requires you to hit the invisible layer change trigger in Sun Tower and climb back up to the door ' +
      'with only bombs, by infinite bomb jumping up the left-side wall next to the spider track, just below ' +
      'the ledge.',
    fileType: '.ciso and .iso files are supported by Nintendont and Dolphin. Currently, only Dolphin supports .gcz files.',
    floatyJump: 'You may be required to go out of bounds and activate the Floaty Jump state to do things such as ' +
      'cross Magma Pool, grab the Main Plaza (Tree) item from out of bounds, the Dynamo (Spider Track) ' +
      'item, or the Furnace (Spider Track) item with just morph ball and bombs.',
    ghettoJumping: 'Jumping against slopes will give you a height boost. When done underwater without ' +
      'the Gravity Suit, you will gain incredible amounts of height. This trick has many useful applications, ' +
      'such as jumping up half-pipes to otherwise unreachable ledges, reaching Tower Chamber without Gravity Suit, ' +
      'and climbing taller rooms without Spider Ball, Boost Ball, or Grapple Beam.',
    goal: 'Changing this affects the requirements to access the Ridley fight and the Impact Crater.\n\n' +
      '\'Always Open\': Collecting the Artifact Temple item immediately begins the Ridley fight.\n' +
      '\'Artifact Collection:\' Collect 1-12 Chozo Artifacts placed in the game world.\n' +
      '\'All Bosses:\': Defeat Flaahgra, Thardus, and Omega Pirate, and collect their Chozo Artifacts.',
    heatDamagePrevention: '\'Any Suit\': Collecting any of the three suits will prevent heat damage.\n' +
      '\'Varia Suit Only\': Only the Varia Suit will prevent heat damage.',
    hideItemModels: 'Replaces all item models with a "glitched texture" suit model.',
    ibbf: 'You can reach the latter section of Chozo Ruins without either Wave or Ice Beam by ' +
      'wallcrawling from Gathering Hall to either Crossway or Reflecting Pool Access.',
    infiniteBoostEliteResearch: 'If you have Boost Ball, it\'s possible to enter Elite Research from the ' +
      'upper door before using the laser. You can get stuck in the wall and continually boost to clip through.',
    infiniteSpeedEarlySun: 'You can obtain the Chozo Ice Temple and Phendrana Shorelines (Behind Ice) ' +
      'items early by getting Infinite Speed in Chapel of the Elders, then boosting in Chapel Tunnel ' +
      'and Phendrana Shorelines respectively.',
    infiniteSpeedMagmaPool: 'You can obtain the Magma Pool item without power bombs using IS. Position ' +
      'yourself between the crates and the wall, then lock onto the grapple point closest to you. Morph, ' +
      'get Infinite Speed, bomb yourself out of the crates, then boost into the wall.',
    infiniteSpeedHote: 'You can obtain the Hall of the Elders and Elder Chamber items simultaneously ' +
      'using IS. Transition out of HOTE into East Furnace Access, barely walk back into HOTE without ' +
      'transitioning the room, then jump on top of the door frame. HOTE\'s textures will unload, and ' +
      'you can get IS on the door frame. Boost off the frame when IS is active, then roll behind the statue ' +
      'and boost into the wall.',
    lJumping: 'You can jump faster/farther by holding the L trigger when starting your jump, and ' +
      'letting go after 13 frames. Commonly used to jump to platforms or areas that are normally ' +
      'just out of reach of your regular jump, such as the Main Plaza upper ledge and grapple ledge.',
    noBombsPointOfNoReturnTunnels: 'You will never be required to commit to entering Burn Dome, ' +
      'the Fiery Shores tunnel below Warrior Shrine, and the Control Tower morph tunnel to ' +
      'obtain the Morph Ball Bomb.',
    noBoostBallLowerMinesGlitched: 'You will not be required to pass through Ventilation Shaft to ' +
      'obtain the Boost Ball, even if you can dash or half-pipe bomb jump to climb back up the half-pipe.',
    noCrashedFrigate: 'You will never be required to obtain any of the Crashed Frigate\'s three items.',
    noEarlyPhazonSuit: 'The Phazon Suit will not appear in "early-game" locations that require ' +
      'only a few items to access, including most of Tallon Overworld, almost all of the first ' +
      'half of Chozo Ruins, most of Magmoor Caverns, and almost all of the early ' +
      'Phendrana Drifts locations.',
    noGravitySuitInGravityChamber: 'The Gravity Suit will not appear in either of the two item locations ' +
      'in Gravity Chamber.',
    noReversePhendranaBombs: 'You will never be required to enter Phendrana Drifts from the Magmoor South ' +
      'elevator to obtain the Morph Ball Bomb.',
    noSupers: 'You will never be required to use Super Missiles to enter or exit Quarantine Cave. ' +
      'In addition, you are never required to obtain the items in the following locations:\n\nMain Plaza (Tree)\n' +
      'Research Lab Hydra\nBiohazard Containment\nMetroid Quarantine B\nCrossway\nSunchamber ' +
      '(Ghosts)\nPhendrana Shorelines (Spider Track)',
    noVanillaBeams: 'The Wave, Ice, and Plasma Beams will never appear in Chapel of the Elders, ' +
      'Antechamber, or Plasma Processing, respectively.',
    oobNoBombs: 'Morph Ball Bombs will not be considered when the item logic checks if you ' +
      'can wallcrawl. Be warned that you can easily softlock by wallcrawling without bombs ' +
      'equipped.',
    requireThermal: 'The item logic will always require that you obtain the Thermal Visor to access ' +
      'items locked behind power conduits (such as Magmoor Workstation) or the Thardus boss fight.',
    requireXRay: 'The item logic will always require that you obtain the X-Ray Visor to access ' +
      'items that require traversing invisible platforms, such as Great Tree Chamber ' +
      'and any item in lower Phazon Mines.',
    rJumping: 'More technical than a L jump, you can jump faster/farther with proper execution, ' +
      'at the cost of losing a lot of control over your jump trajectory. Generally used to cross ' +
      'Twin Fires Tunnel to late Magmoor, and traverse lower Phazon Mines without Grapple Beam.\n\n' +
      'This trick requires the Space Jump Boots and can be used in place of dashing in some rooms.',
    rootCaveSW: 'You can wallcrawl to Arbor Chamber from Root Cave (with Space Jump) or Gully (without Space Jump) ' +
      ' without needing the Plasma Beam equipped.',
    shuffleArtifacts: 'Enabling this shuffles the Chozo Artifacts around the game world, after items are placed. ' +
      'This only applies for Artifact Collection seeds.',
    shuffleBombs: 'Enabling this shuffle the Morph Ball Bombs into the item pool.',
    shuffleCharge: 'Enabling this shuffles the Charge Beam into the item pool.',
    shuffleMissileLauncher: 'Enabling this shuffles the Missile Launcher into the item pool.',
    shuffleMorph: 'Enabling this shuffles the Morph Ball into the item pool.',
    shuffleSpaceJump: 'Enabling this shuffles the Space Jump boots into the item pool.',
    skipFrigate: 'Start the game on Tallon Overworld instead of the frigate.',
    skipHudPopups: 'The game won\'t pause or display a popup when obtaining items.',
    spiderlessShafts: 'It\'s possible to climb Elevator Access A and Research Access without Spider Ball. ' +
      'For Elevator Access A, there is standable collision that you can BSJ and jump to next to the spider track. ' +
      'For Research Access, you can jump to some narrow collision on a boulder to reach the Elite Research door.',
    spoiler: 'Creates a spoiler .txt file.',
    standableTerrain: 'You can stand on a lot of collision in the game, even if it doesn\'t look like you can ' +
      'stand on it. Usually this setting is used in conjunction with dashing, L jumping, R jumping, and more ' +
      'to reach items early, such as the Ruined Fountain item without bombs.',
    suitDamageReduction: '\'Default\': Damage reduction is based only on the most powerful suit you have obtained. ' +
      'Varia = 10%, Gravity = 20%, Phazon = 50%.\n' +
      '\'Cumulative\': Damage reduction is based on the number of suits you have obtained. ' +
      '1 Suit = 10%, 2 Suits = 20%, 3 Suits = 50%.',
    trainingChamberOOB: 'You can wallcrawl from Main Plaza to Training Chamber or Training Chamber Access, ' +
      'then grab their items without the Wave Beam (or Boost/Spider/Supers for Training Chamber) by using a ' +
      'ceiling warp to go back inbounds.',
    waveSun: 'You can grab both the Chapel of the Elders and Chozo Ice Temple items at the same time by ' +
      'wallcrawling to Chozo Ice Temple, transitioning the active room to Chapel Tunnel, clipping back ' +
      'inbounds in Chozo Ice Temple, then getting infinite speed against the wall near the bomb slot.',
    workstationToPlasmaProcessing: 'You can go out of bounds and wallcrawl to the Plasma Processing door without ' +
      'Space Jump, Boost Ball, Spider Ball, or Grapple Beam, then clip through the lowered ceiling when going ' +
      'back to Geothermal Core.'
  };

  constructor() { }

  getSettings() {
    return this.settings;
  }

  getSubmittedFlag() {
    return this.submitted$;
  }

  getTooltips() {
    return this.tooltips;
  }

  updateSubmittedFlag(submitted: boolean) {
    this.submitted$.next(submitted);
  }
}
