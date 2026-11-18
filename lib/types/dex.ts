export type DexItem = {
  id: number;
  name: string;
  pokemonUrl: string;
  speciesUrl: string;
};

export type PokedexResponse = {
  pokemon_entries: {
    entry_number: number;
    pokemon_species: { name: string; url: string };
  }[];
};
