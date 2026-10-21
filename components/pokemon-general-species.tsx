import type { SpeciesDetails } from "@/lib/pokeapi";

type Props = {
  species: SpeciesDetails;
};

function formatName(value: string) {
  return value.replaceAll("-", " ");
}

export function PokemonGeneralSpecies({ species }: Props) {
  return (
    <div className="flex gap-2 w-fit h-fit bg-gray-300/50 backdrop-blur-sm p-2 rounded-lg ml-2">
      <div className="flex">
        <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-l-lg">Genus</h3>
        {species.genera?.genus ? (
          <div className="bg-white rounded-r-lg py-1 px-2">{formatName(species.genera.genus)}</div>
        ) : (
          <div className="bg-white rounded-r-lg p-2">Unknown</div>
        )}
      </div>
      <div className="flex">
        <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-l-lg">Habitat</h3>
        {species.habitat?.name ? (
          <div className="bg-white rounded-r-lg py-1 px-2 capitalize">{formatName(species.habitat.name)}</div>
        ) : (
          <div className="bg-white rounded-r-lg p-2">Unknown</div>
        )}
      </div>
      <div className="flex">
        <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-l-lg">Shape</h3>
        {species.shape?.name ? (
          <div className="bg-white rounded-r-lg py-1 px-2 capitalize">{formatName(species.shape.name)}</div>
        ) : (
          <div className="bg-white rounded-r-lg p-2">Unknown</div>
        )}
      </div>
    </div>
  );
}
