import type { PokemonDetails, SpeciesDetails } from "@/lib/pokeapi";
import { PokemonGeneralAbilities } from "./pokemon-general-abilities";
import { PokemonGeneralBreeding } from "./pokemon-general-breeding";
import { PokemonGeneralCries } from "./pokemon-general-cries";
import { PokemonGeneralExperience } from "./pokemon-general-experience";
import { PokemonGeneralSpecies } from "./pokemon-general-species";
import { PokemonTypeEffectiveness } from "./pokemon-type-effectiveness";

type PokemonGeneralInfoProps = {
  pokemon: PokemonDetails;
  species: SpeciesDetails;
};

export function PokemonGeneralInfo({
  pokemon,
  species,
}: PokemonGeneralInfoProps) {
  return (
    <div className="flex flex-col items-end">
      <p className="my-2 text-lg italic bg-gray-200/50 p-2 rounded-lg w-fit backdrop-blur-sm">
        &quot;{species.flavor_text_entries?.flavor_text ??
          "No Pokédex entry available."}&quot;
      </p>
      <div className="flex flex-col gap-2 items-end">
        <div className="flex w-fit gap-2 bg-gray-200/50 backdrop-blur-sm rounded-lg p-2">
          <PokemonGeneralAbilities pokemon={pokemon} />
          <PokemonGeneralExperience pokemon={pokemon} species={species} />
          <PokemonGeneralBreeding species={species} />
        </div>
        <PokemonGeneralSpecies species={species} />
        <PokemonGeneralCries pokemon={pokemon} />
        <PokemonTypeEffectiveness types={pokemon.types} />
      </div>
    </div>
  );
}
