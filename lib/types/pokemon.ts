export type Pokemon = {
  id: number;
  name: string;
  types: PokemonTypeEntry[];
  sprites: { front_default: string | null };
};

export type PokemonTypeEntry = {
  slot: number;
  type: { name: string; url: string };
};

export type OfficialArtwork = {
  front_default: string | null;
  front_shiny: string | null;
};

export type PokemonSprites = {
  other?: { "official-artwork"?: OfficialArtwork };
  [sprite: string]: unknown;
};

export type PokemonDetailsResponse = {
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: { name: string; url: string };
  }[];
  base_experience: number;
  cries: { latest: string; legacy: string | null };
  forms: { name: string; url: string }[];
  game_indices: { game_index: number; version: { name: string; url: string } }[];
  height: number;
  held_items: {
    item: { name: string; url: string };
    version_details: { rarity: number; version: { name: string; url: string } }[];
  }[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: { name: string; url: string };
    version_group_details: {
      level_learned_at: number;
      version_group: { name: string; url: string };
      move_learn_method: { name: string; url: string };
    }[];
  }[];
  name: string;
  past_abilities: unknown[];
  past_stats: unknown[];
  past_types: unknown[];
  species: { name: string; url: string };
  sprites: PokemonSprites;
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];
  types: PokemonTypeEntry[];
  weight: number;
};

export type PokemonDetails = Omit<
  PokemonDetailsResponse,
  "past_abilities" | "past_stats" | "past_types" | "sprites"
> & {
  sprites: { other: { "official-artwork": OfficialArtwork } };
};
