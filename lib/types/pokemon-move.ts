export type PokemonMoveDetails = {
  accuracy: number | null;
  damage_class: { name: string; url: string };
  name: string;
  power: number | null;
  pp: number | null;
  priority: number;
  type: { name: string; url: string };
};
