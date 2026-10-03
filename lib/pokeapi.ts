const BASE_URL = "https://pokeapi.co/api/v2";

export type DexItem = { id: number; name: string };

type PokedexResponse = {
  pokemon_entries: {
    entry_number: number;
    pokemon_species: { name: string; url: string };
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  types: { slot: number; type: { name: string } }[];
  sprites: {
    front_default: string | null ;
  };
};

export async function fetchNationalDex(): Promise<DexItem[]> {
  const res = await fetch(`${BASE_URL}/pokedex/national`);
  if (!res.ok) throw new Error(`Failed to fetch dex: ${res.status}`);
  const data: PokedexResponse = await res.json();

  return data.pokemon_entries.map((e) => ({
    id: e.entry_number,
    name: e.pokemon_species.name,
  }));
}

export async function fetchPokemon(id: number): Promise<Pokemon> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch pokemon ${id}: ${res.status}`);
  return res.json();
}