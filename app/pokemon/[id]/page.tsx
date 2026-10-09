import Image from "next/image";
import Link from "next/link";
import {
  fetchPokemonDetails,
  fetchSpeciesDetails,
} from "@/lib/pokeapi";
import { isPokemonType, type PokemonType } from "@/lib/colors/type-colors";
import { TypeBadge } from "@/components/type-badge";
import { PokemonStats } from "@/components/pokemon-stats";

type PokemonPageProps = {
  searchParams: Promise<{ pokemonUrl?: string; speciesUrl?: string }>;
};

export default async function PokemonPage({
  searchParams,
}: PokemonPageProps) {
  const { pokemonUrl, speciesUrl } = await searchParams;

  if (!pokemonUrl || !speciesUrl) {
    throw new Error("Missing Pokémon or species URL");
  }

  const [pokemon, species] = await Promise.all([
    fetchPokemonDetails(pokemonUrl),
    fetchSpeciesDetails(speciesUrl),
  ]);
  void species;

  const artwork = pokemon.sprites.other["official-artwork"].front_default;
  const name = pokemon.name;
  const primaryType = pokemon.types[0]?.type.name;
  const backgroundImage = isPokemonType(primaryType)
    ? `url("/backgrounds/${primaryType}.webp")`
    : undefined;

  return (
    <main
      className="flex h-full p-2 bg-white bg-cover bg-no-repeat"
      style={{ backgroundImage }}
    >
      <div className="flex-col p-2 h-fit w-1/3 bg-gray-200/50 backdrop-blur-sm rounded-lg">
        <div className="flex w-full justify-between items-center gap-4 bg-gray-300 p-2 rounded-lg">
          <Link href="/" className="self-start rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-500">
            Back
          </Link>
          <h1 className="text-2xl font-bold capitalize text-black">{name}</h1>
          <div className="flex min-h-6 gap-1">
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} type={type.name as PokemonType} />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          {artwork && (
            <Image
              src={artwork}
              alt={name}
              width={400}
              height={400}
              priority
            />
          )}
        </div>
        <PokemonStats stats={pokemon.stats} />
      </div>
    </main>
  );
}
