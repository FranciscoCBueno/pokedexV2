export type EvolutionChainNode = {
  species: { name: string; url: string };
  evolves_to: EvolutionChainNode[];
};

export type EvolutionChain = {
  chain: EvolutionChainNode;
};
