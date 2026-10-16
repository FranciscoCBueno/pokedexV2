import type { PokemonDetails, SpeciesDetails } from "@/lib/pokeapi";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { IconContext } from "react-icons";

type PokemonGeneralInfoProps = {
  pokemon: PokemonDetails;
  species: SpeciesDetails;
};

function formatName(value: string) {
  return value.replaceAll("-", " ");
}

export function PokemonGeneralInfo({
  pokemon,
  species,
}: PokemonGeneralInfoProps) {
  const genderRate =
    species.gender_rate === -1
      ? <div className="flex text-center p-2 rounded-b-lg justify-center bg-white">Genderless</div>
      : <div className="flex text-center p-2 rounded-b-lg items-center gap-1 bg-white">
        <IconContext.Provider value={{ color: "magenta" }}>
          <IoMdFemale /> 
        </IconContext.Provider>
        {species.gender_rate * 12.5}% / 
        <IconContext.Provider value={{ color: "blue" }}>
          <IoMdMale/> 
        </IconContext.Provider>
        {(8 - species.gender_rate) * 12.5}%
      </div>

  return (
    <div className="flex flex-col items-end">
      <p className="my-2 text-lg italic bg-gray-200/50 p-2 rounded-lg w-fit backdrop-blur-sm">
        "{species.flavor_text_entries?.flavor_text ??
          "No Pokédex entry available."}"
      </p>
      <div className="flex flex-col gap-2 items-end">
        <div className="flex w-fit gap-2 bg-gray-200/50 backdrop-blur-sm rounded-lg p-2">
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
          <div className="flex flex-col gap-3 bg-gray-300/50 rounded-lg p-1">
            <div className="flex flex-col w-fit">
              <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-t-lg">Gender Rate</h3>
              {genderRate}
            </div>
            <div className="flex flex-col w-full">
              <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-t-lg">Egg Groups</h3>
              <div className="flex justify-center gap-2 bg-white rounded-b-lg p-2">
                {species.egg_groups.map(({ name }) => 
                  <div className="capitalize px-2 py-1 bg-gray-200 rounded-md w-fit" key={name}>
                    {formatName(name)}
                  </div>)}
              </div>
            </div>
            <div className="flex items-center w-full">
              <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-l-lg">Hatch Counter</h3>
              {species.hatch_counter !== null ? (
                <div className="bg-white rounded-r-lg py-1 px-2">
                  {species.hatch_counter + 1}
                </div>
              ) : (
                <div className="bg-white rounded-r-lg p-2">Unknown</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-fit h-fit bg-gray-300/50 backdrop-blur-sm p-2 rounded-lg ml-2">
          <div className="flex">
            <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-l-lg">Genus</h3>
            {species.genera?.genus ? (
              <div className="bg-white rounded-r-lg py-1 px-2">
                {formatName(species.genera.genus)}
              </div>
            ) : (
              <div className="bg-white rounded-r-lg p-2">Unknown</div>
            )}
          </div>
          <div className="flex">
            <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-l-lg">Habitat</h3>
            {species.habitat?.name ? (
              <div className="bg-white rounded-r-lg py-1 px-2 capitalize">
                {formatName(species.habitat.name)}
              </div>
            ) : (
              <div className="bg-white rounded-r-lg p-2">Unknown</div>
            )}
          </div>
          <div className="flex">
            <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-l-lg">Shape</h3>
            {species.shape?.name ? (
              <div className="bg-white rounded-r-lg py-1 px-2 capitalize">
                {formatName(species.shape.name)}
              </div>
            ) : (
              <div className="bg-white rounded-r-lg p-2">Unknown</div>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full bg-gray-300/50 backdrop-blur-sm p-2 rounded-lg">
          <h3 className="bg-gray-300 font-bold py-1 px-2 rounded-t-md">Cries</h3>
          <div className="flex w-full gap-2 bg-white p-2 rounded-b-md">
            <div className="flex flex-col gap-1 w-full bg-gray-200 p-2 rounded-md">
            Latest
              {pokemon.cries.latest && (
                <audio controls src={pokemon.cries.latest} />
              )}
            </div>
            <div className="flex flex-col gap-1 w-full bg-gray-200 p-2 rounded-md">
              Legacy
              {pokemon.cries.legacy && (
                <audio controls src={pokemon.cries.legacy} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
