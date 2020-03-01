interface SettingsDetails {
  [key: string]: DetailObject
}

interface DetailObject {
  name: string;
  description: string;
  items?: SettingsDetails
}

export const details: SettingsDetails = {
  skipFrigate: {
    name: 'Skip the Space Pirate Frigate',
    description: `You will start the game at the chosen starting area instead of the frigate.`
  },
  skipHudPopups: {
    name: 'Skip Item Acquisition Popups',
    description: `The game won't pause and display a popup when you obtain an item.`
  },
  hideItemModels: {
    name: 'Hide Item Models',
    description: `All items will use the Metroid logo with a glitched texture. Their scan entries will also be removed.`
  },
  goal: {
    name: 'Goal',
    description: `This sets the requirements to access the Meta Ridley fight, and by extension the Impact Crater.

    'Artifact Collection': Collect 1-12 Chozo Artifacts placed in the game world.
    'Always Open': Collecting the Artifact Temple item immediately begins the Meta Ridley fight.
    'All Bosses': Defeat Flaahgra, Thardus, and Omega Pirate, and collect their Chozo Artifacts they leave behind.`
  },
  goalArtifacts: {
    name: 'Number of Chozo Artifacts',
    description: `Sets the number of required Chozo Artifacts for Artifact Collection seeds.`
  },
  artifactLocationHints: {
    name: 'Show Chozo Artifact location hints in Artifact Temple',
    description: `Controls whether the totems in the Artifact Temple can be scanned for their hints.

    If enabled, all hint scans are available from the start.
    If disabled, the hint scans will be removed from the game.`
  },
  elevatorShuffle: {
    name: 'Elevator Shuffle',
    description: `Shuffles all of the elevators bidirectionally.`
  },
  heatProtection: {
    name: 'Heat Protection',
    description: `'Any Suit': Collecting any of the three suits will prevent heat damage.
    'Varia Only': Only the Varia Suit will prevent heat damage.

    The item logic does take this setting into account. Keep in mind that while all of early Magmoor is superheated,
    only Twin Fires Tunnel is superheated when going to far Magmoor. This means that you MAY be required to reach far
    Magmoor or Phendrana Drifts through Phazon Mines to obtain Varia or your first suit upgrade.`
  },
  suitDamageReduction: {
    name: 'Suit Damage Reduction',
    description: `'Default': Damage reduction is based on the most powerful suit you have obtained.
    Varia = 10%, Gravity = 20%, Phazon = 50%.

    'Progressive': Damage reduction is based on the number of suits you have obtained.
    '1 Suit = 10%, 2 Suits = 20%, 3 Suits = 50%.`
  },
  startingArea: {
    name: 'Starting Area',
    description: `Choose which area to start the game in.

    You can choose an area from the list, or have it chosen randomly from the same list.`
  },
  randomStartingItems: {
    name: 'Random Starting Items',
    description: `Controls how many additional items you will start the game with, between a minimum and maximum amount.

    This setting stacks with item overrides.`,
    items: {
      minimum: {
        name: 'Minimum',
        description: 'This controls how many additional items you will always start with.'
      },
      maximum: {
        name: 'Maximum',
        description: 'This controls how many additional items you can have at maximum.'
      }
    }
  },
  alcoveNoItems: {
    name: 'Alcove with No Additional Items',
    description: `It's possible to reach the Alcove room without any items by performing a dash from Samus's ship to the upper ledge, near the Gully door.

    This can be done with a scan dash off the Red Starburst above the Temple Hall door, or by locking onto a Seedling in Temple Hall and then dashing.`
  },
  arborChamberWithoutPlasma: {
    name: 'Arbor Chamber without Plasma Beam',
    description: `Arbor Chamber can be entered through the ceiling by going out of bounds.`
  },
  boostThroughBombTunnels: {
    name: 'Traverse Morph Ball Bomb tunnels with Boost Ball',
    description: `In morph tunnels that normally require single bomb jumps to traverse or access them, a properly-timed boost can be used instead.

    This trick is difficult and not recommended for beginners.`
  },
  climbTowerOfLightNoMissiles: {
    name: 'Climb Tower of Light without Missiles',
    description: `Tower of Light can be climbed by dashing to the outside edges, skipping the 40 missile requirement.`
  },
  crossTwinFiresTunnelWithoutSpider: {
    name: 'Cross Twin Fires Tunnel without Spider Ball',
    description: `Twin Fires Tunnel can be crossed with an R jump, or a scan dash off the spider track from the wall.`
  },
  mainPlazaItemsOnlySpaceJump: {
    name: 'Main Plaza Items with only Space Jump',
    description: `The Grapple Ledge, Locked Door, and Half Pipe items can be reached with only Space Jump equipped.`
  },
  towerChamberNoGravity: {
    name: 'Tower Chamber without Gravity Suit',
    description: `The ledge can be reached by underwater slope jumping to the door without the Gravity Suit equipped.`
  },
  upperRuinedShrineTowerOfLightFewerAccessReqs: {
    name: 'Upper Ruined Shrine & Tower of Light - Fewer Access Requirements',
    description: `Upper Ruined Shrine and the door to Tower of Light can be reached with just Space Jump Boots (and Wave Beam for the latter).`
  },
  warriorShrineWithoutBoost: {
    name: 'Warrior Shrine without Boost Ball',
    description: `You can space jump to the upper ledge in Monitor Station via R jump or dash.`
  }
};


