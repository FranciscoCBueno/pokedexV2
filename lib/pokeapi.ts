const BASE_URL = "https://pokeapi.co/api/v2";

export type DexItem = {
  id: number;
  name: string;
  pokemonUrl: string;
  speciesUrl: string;
};

type PokedexResponse = {
  pokemon_entries: {
    entry_number: number;
    pokemon_species: { name: string; url: string };
  }[];
};

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

type OfficialArtwork = {
  front_default: string | null;
  front_shiny: string | null;
};

type PokemonSprites = {
  other?: { "official-artwork"?: OfficialArtwork };
  [sprite: string]: unknown;
};

type PokemonDetailsResponse = {
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

type FlavorTextEntry = {
  flavor_text: string;
  language: { name: string; url: string };
  version: { name: string; url: string };
};

type Genus = {
  genus: string;
  language: { name: string; url: string };
};

type SpeciesDetailsResponse = {
  base_happiness: number | null;
  capture_rate: number;
  egg_groups: [
    {
      name: string;
      url: string;
    }
  ];
  evolution_chain: { url: string };
  evolves_from_species: { name: string; url: string } | null;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: [
    {
      description: string;
    }
  ];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: { name: string; url: string };
  growth_rate: { name: string; url: string };
  habitat: { name: string; url: string } | null;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: unknown[];
  order: number;
  pal_park_encounters: [
    {
      base_score: number;
      rate: number;
      area: { name: string; url: string };
    }
  ];
  pokedex_numbers: unknown[];
  shape: { name: string; url: string } | null;
  varieties: [
    {
      is_default: boolean;
      pokemon: { name: string; url: string };
    }
  ];
  color: { name: string; url: string } | null;
};

export type SpeciesDetails = Omit<
  SpeciesDetailsResponse,
  | "order"
  | "has_gender_differences"
  | "pokedex_numbers"
  | "color"
  | "names"
  | "flavor_text_entries"
  | "genera"
> & {
  flavor_text_entries: FlavorTextEntry | undefined;
  genera: Genus | undefined;
};

function latestEnglish<T extends { language: { name: string } }>(
  entries: T[],
): T | undefined {
  return entries.filter(({ language }) => language.name === "en").at(-1);
}

function selectOfficialArtwork(
  sprites: PokemonSprites,
): PokemonDetails["sprites"] {
  return {
    other: {
      "official-artwork": sprites.other?.["official-artwork"] ?? {
        front_default: null,
        front_shiny: null,
      },
    },
  };
}

export async function fetchDex(dexName: string): Promise<DexItem[]> {
  const res = await fetch(`${BASE_URL}/pokedex/${dexName}`);
  if (!res.ok) throw new Error(`Failed to fetch dex: ${res.status}`);
  const data: PokedexResponse = await res.json();

  return data.pokemon_entries.map((entry) => {
    const id = Number(entry.pokemon_species.url.split("/").at(-2));
    return {
      id,
      name: entry.pokemon_species.name,
      pokemonUrl: `${BASE_URL}/pokemon/${id}`,
      speciesUrl: entry.pokemon_species.url,
    };
  });
}

export async function fetchPokemon(id: number): Promise<Pokemon> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch pokemon ${id}: ${res.status}`);
  return res.json();
}

export async function fetchPokemonDetails(
  url: string,
): Promise<PokemonDetails> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon details: ${res.status}`);

  const {
    past_abilities: _pastAbilities,
    past_stats: _pastStats,
    past_types: _pastTypes,
    sprites,
    ...pokemon
  } = (await res.json()) as PokemonDetailsResponse;

  return { ...pokemon, sprites: selectOfficialArtwork(sprites) };
}

export async function fetchSpeciesDetails(
  url: string,
): Promise<SpeciesDetails> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon species: ${res.status}`);

  const {
    order: _order,
    has_gender_differences: _hasGenderDifferences,
    pokedex_numbers: _pokedexNumbers,
    color: _color,
    names: _names,
    flavor_text_entries,
    genera,
    ...species
  } = (await res.json()) as SpeciesDetailsResponse;

  return {
    ...species,
    flavor_text_entries: latestEnglish(flavor_text_entries),
    genera: latestEnglish(genera),
  };
}
