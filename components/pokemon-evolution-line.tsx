import Image from "next/image";
import Link from "next/link";
import {
  fetchEvolutionChain,
  fetchPokemonDetails,
  getPokemonApiUrls,
  type EvolutionChainNode,
} from "@/lib/pokeapi";

type PokemonEvolutionLineProps = {
  evolutionChainUrl: string;
};

function getId(url: string) {
  return Number(url.split("/").at(-2));
}

type EvolutionDetails = {
  id: number;
  name: string;
  artwork: string | null;
  evolutions: EvolutionDetails[];
};

async function loadEvolutionDetails(
  node: EvolutionChainNode,
): Promise<EvolutionDetails> {
  const id = getId(node.species.url);
  const { pokemonUrl } = getPokemonApiUrls(id);
  const pokemon = await fetchPokemonDetails(pokemonUrl);

  return {
    id,
    name: pokemon.name,
    artwork: pokemon.sprites.other["official-artwork"].front_default,
    evolutions: await Promise.all(node.evolves_to.map(loadEvolutionDetails)),
  };
}

function EvolutionStage({
  evolution,
  isRoot = false,
}: {
  evolution: EvolutionDetails;
  isRoot?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-start gap-2 ${
        isRoot ? "" : "border-l-2 border-gray-400 pl-3"
      }`}
    >
      <Link
        href={`/pokemon/${evolution.id}`}
        className="flex w-28 flex-col items-center rounded-lg border-2 border-gray-500 bg-white transition-transform hover:scale-105"
      >
        {evolution.artwork && (
          <Image
            src={evolution.artwork}
            alt={evolution.name}
            width={96}
            height={96}
            className="m-2"
          />
        )}
        <span className="w-full rounded-b-lg bg-gray-200 p-1 text-center capitalize text-black">
          {evolution.name}
        </span>
      </Link>
      {evolution.evolutions.length > 0 && (
        <div className="flex flex-col items-start gap-2">
          {evolution.evolutions.map((child) => (
            <EvolutionStage
              key={child.id}
              evolution={child}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export async function PokemonEvolutionLine({
  evolutionChainUrl,
}: PokemonEvolutionLineProps) {
  const evolutionChain = await fetchEvolutionChain(evolutionChainUrl);
  const evolutionDetails = await loadEvolutionDetails(evolutionChain.chain);

  return (
    <section className="flex gap-2 h-fit w-fit flex-col items-center rounded-lg p-2 bg-gray-300/50">
      <h2 className="rounded-lg bg-gray-200 text-black px-3 py-2 w-full text-center font-bold">
        Evolution Line
      </h2>
      <div className="flex w-full flex-col items-start gap-2 pl-2">
        <EvolutionStage evolution={evolutionDetails} isRoot />
      </div>
    </section>
  );
}
