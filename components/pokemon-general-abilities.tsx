import type { PokemonDetails } from "@/lib/pokeapi";

type Props = {
  pokemon: PokemonDetails;
};

function formatName(value: string) {
  return value.replaceAll("-", " ");
}

export function PokemonGeneralAbilities({ pokemon }: Props) {
  return (
    <div className="flex flex-col gap-2 bg-gray-300/50 rounded-lg p-2">
        <div className="flex flex-col h-fit w-fit">
          <div className="flex flex-col bg-white rounded-lg">
            <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-t-lg">Abilities</h3>
            <div className="flex flex-col p-2 gap-2">
              {pokemon.abilities.map(({ ability, is_hidden }) => (
                <span key={ability.name} className="capitalize px-2 py-1 bg-gray-200 rounded-md w-fit">
                  {formatName(ability.name)}
                  {is_hidden ? " (Hidden)" : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-fit">
          <div className="flex gap-2 items-center bg-white rounded-lg pr-2">
            <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-l-lg">Height</h3>
            {pokemon.height / 10}m
          </div>
          <div className="flex gap-2 items-center bg-white rounded-lg pr-2">
            <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-l-lg">Weight</h3>
            {pokemon.weight / 10}kg
          </div>
        </div>
    </div>
  );
}
