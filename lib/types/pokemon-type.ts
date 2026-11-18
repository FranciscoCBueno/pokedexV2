export type PokemonTypeDetails = {
  damage_relations: {
    no_damage_from: { name: string; url: string }[];
    half_damage_from: { name: string; url: string }[];
    double_damage_from: { name: string; url: string }[];
  };
};
