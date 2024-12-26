export interface Data {
    count: number;
    next: string;
    previous: null | string;
    results: any[];
}

export interface Afecting_moves {
    decrease: Decrease[];
    increase: Increase[];
}

export interface Decrease {
    damage_class: {
        name: string;
        url: string;
    };
    move: {
        name: string;
        url: string;
    };
}

export interface Increase {
    damage_class: {
        name: string;
        url: string;
    };
    move: {
        name: string;
        url: string;
    };
}


export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Ability[];
    forms: NamedAPIResource[];
    game_indices: GameIndex[];
    held_items: HeldItem[];
    location_area_encounters: string;
    moves: Move[];
    species: NamedAPIResource;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
  }
  
  interface Ability {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
  }
  
  interface NamedAPIResource {
    name: string;
    url: string;
  }
  
  interface GameIndex {
    game_index: number;
    version: NamedAPIResource;
  }
  
  interface HeldItem {
    item: NamedAPIResource;
    version_details: VersionDetail[];
  }
  
  interface VersionDetail {
    rarity: number;
    version: NamedAPIResource;
  }
  
  interface Move {
    move: NamedAPIResource;
    version_group_details: VersionGroupDetail[];
  }
  
  interface VersionGroupDetail {
    level_learned_at: number;
    version_group: NamedAPIResource;
    move_learn_method: NamedAPIResource;
  }
  
  interface Sprites {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other?: OtherSprites;
    versions?: Versions;
  }
  
  interface OtherSprites {
    dream_world: Sprite;
    home: Sprite;
    "official-artwork": Sprite;
  }
  
  interface Sprite {
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
  }
  
  interface Versions {
    [key: string]: {
      [key: string]: Sprite;
    };
  }
  
  interface Stat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
  }
  
  interface Type {
    slot: number;
    type: NamedAPIResource;
  }
  