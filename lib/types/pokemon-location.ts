export type PokemonLocationAreaEncounters = {
  location_area: { name: string; url: string };
  version_details: {
    encounter_details: {
      chance: number;
      max_level: number;
      min_level: number;
      method: { name: string; url: string };
    }[];
    max_chance: number;
    version: { name: string; url: string };
  }[];
}[];
