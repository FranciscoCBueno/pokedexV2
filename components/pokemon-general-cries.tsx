import type { PokemonDetails } from "@/lib/pokeapi";

type Props = {
  pokemon: PokemonDetails;
};

export function PokemonGeneralCries({ pokemon }: Props) {
  return (
    <div className="flex flex-col w-full bg-gray-300/50 backdrop-blur-sm p-2 rounded-lg">
      <h3 className="bg-gray-300 font-bold py-1 px-2 rounded-t-md">Cries</h3>
      <div className="flex w-full gap-2 bg-white p-2 rounded-b-md">
        <div className="flex flex-col gap-1 w-full bg-gray-200 p-2 rounded-md">
          Latest
          {pokemon.cries.latest && <audio controls src={pokemon.cries.latest} />}
        </div>
        <div className="flex flex-col gap-1 w-full bg-gray-200 p-2 rounded-md">
          Legacy
          {pokemon.cries.legacy && <audio controls src={pokemon.cries.legacy} />}
        </div>
      </div>
    </div>
  );
}
