import type { PokemonDetails, SpeciesDetails } from "@/lib/pokeapi";

type Props = {
  pokemon: PokemonDetails;
  species: SpeciesDetails;
};

function formatName(value: string) {
  return value.replaceAll("-", " ");
}

export function PokemonGeneralExperience({ pokemon, species }: Props) {
  return (
    <div className="h-fit gap-4 text-center bg-gray-300/50 rounded-lg w-fit p-1 capitalize">
      <div className="flex gap-3 mb-4">
        <div className="pb-1 bg-white rounded-md">
          <h3 className="bg-gray-300 font-bold py-1 px-2 rounded-t-md mb-1">Base Experience</h3>
          {pokemon.base_experience ?? "Unknown"}
        </div>
        <div className="pb-1 bg-white rounded-md">
          <h3 className="bg-gray-300 font-bold py-1 px-2 rounded-t-md mb-1">Capture Rate</h3>
          {species.capture_rate ?? "Unknown"}
        </div>
      </div>
      <div className="pb-1 bg-white rounded-md mb-4">
        <h3 className="bg-gray-300 font-bold py-1 px-2 rounded-t-md">Base Happiness</h3>
        {species.base_happiness ?? "Unknown"}
      </div>
      <div className="pb-1 bg-white rounded-md">
        <h3 className="bg-gray-300 font-bold py-1 px-2 rounded-t-md">Growth Rate</h3>
        {formatName(species.growth_rate.name) ?? "Unknown"}
      </div>
    </div>
  );
}
