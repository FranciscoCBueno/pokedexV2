import Image from "next/image";
import Link from "next/link";
import {
  fetchPokemonDetails,
  fetchSpeciesDetails,
} from "@/lib/pokeapi";

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

  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center gap-6">
      <div className="flex-col">
        <div className="flex w-fit items-center gap-4">
          <Link href="/" className="self-start rounded bg-red-500 px-4 py-2 text-white">
            Back
          </Link>
          <h1 className="text-2xl font-bold capitalize text-black">{name}</h1>
          <div>
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className="mr-2 rounded bg-gray-200 px-2 py-1 text-sm capitalize"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
        <div>
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
      </div>
    </main>
  );
}
