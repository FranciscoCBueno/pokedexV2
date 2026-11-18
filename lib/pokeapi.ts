import type { DexItem, PokedexResponse } from "@/lib/types/dex";
import type { EvolutionChain } from "@/lib/types/evolution";
import type { PokemonLocationAreaEncounters } from "@/lib/types/pokemon-location";
import type { PokemonMoveDetails } from "@/lib/types/pokemon-move";
import type {
  Pokemon,
  PokemonDetails,
  PokemonDetailsResponse,
  PokemonSprites,
} from "@/lib/types/pokemon";
import type { PokemonTypeDetails } from "@/lib/types/pokemon-type";
import type {
  SpeciesDetails,
  SpeciesDetailsResponse,
} from "@/lib/types/species";

const BASE_URL = "https://pokeapi.co/api/v2";

export function getPokemonApiUrls(id: number) {
  return {
    pokemonUrl: `${BASE_URL}/pokemon/${id}`,
    speciesUrl: `${BASE_URL}/pokemon-species/${id}`,
  };
}

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
      ...getPokemonApiUrls(id),
    };
  });
}

export async function fetchPokemon(id: number): Promise<Pokemon> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch pokemon ${id}: ${res.status}`);
  return res.json();
}

export async function fetchPokemonType(
  url: string,
): Promise<PokemonTypeDetails> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon type: ${res.status}`);
  return res.json();
}

export async function fetchPokemonMove(
  url: string,
): Promise<PokemonMoveDetails> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon move: ${res.status}`);
  return res.json();
}

export async function fetchPokemonLocationAreaEncounters(
  url: string,
): Promise<PokemonLocationAreaEncounters> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokémon location encounters: ${res.status}`);
  }
  return res.json();
}

export async function fetchEvolutionChain(
  url: string,
): Promise<EvolutionChain> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch evolution chain: ${res.status}`);
  }
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
