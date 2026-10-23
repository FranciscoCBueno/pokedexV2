import Link from "next/link";
import {
  fetchPokemonDetails,
  fetchSpeciesDetails,
  getPokemonApiUrls,
} from "@/lib/pokeapi";
import { isPokemonType, type PokemonType } from "@/lib/colors/type-colors";
import { TypeBadge } from "@/components/type-badge";
import { PokemonStats } from "@/components/pokemon-stats";
import { PokemonArtwork } from "@/components/pokemon-artwork";
import { PokemonDetailTabs } from "@/components/pokemon-detail-tabs";
import { PokemonEvolutionLine } from "@/components/pokemon-evolution-line";
import { PokemonAlternateForms } from "@/components/pokemon-alternate-forms";

type PokemonPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PokemonPage({
  params,
}: PokemonPageProps) {
  const { id } = await params;
  const pokemonId = Number(id);

  if (!Number.isInteger(pokemonId) || pokemonId < 1) {
    throw new Error("Invalid Pokémon ID");
  }

  const { pokemonUrl } = getPokemonApiUrls(pokemonId);
  const pokemon = await fetchPokemonDetails(pokemonUrl);
  const species = await fetchSpeciesDetails(pokemon.species.url);
  const officialArtwork = pokemon.sprites.other["official-artwork"];
  const name = pokemon.name;
  const primaryType = pokemon.types[0]?.type.name;
  const backgroundImage = isPokemonType(primaryType)
    ? `url("/backgrounds/${primaryType}.webp")`
    : undefined;

  return (
    <main
      className="flex justify-between h-full p-2 bg-white bg-cover bg-no-repeat"
      style={{ backgroundImage }}
    >
      <div className="flex w-fit p-2 gap-4 bg-gray-200/50 backdrop-blur-sm rounded-lg">
        <div className="flex-col h-fit w-full">
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
          <PokemonArtwork
            name={name}
            artwork={officialArtwork.front_default}
            shinyArtwork={officialArtwork.front_shiny}
          />
          <PokemonStats stats={pokemon.stats} />
        </div>
        <div className="flex flex-col gap-4">
          <PokemonEvolutionLine evolutionChainUrl={species.evolution_chain.url} />
          <PokemonAlternateForms species={species} />
        </div>
      </div>
      <div className="w-fit">
        <PokemonDetailTabs pokemon={pokemon} species={species} />
      </div>
    </main>
  );
}
