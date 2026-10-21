import { IconContext } from "react-icons";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import type { SpeciesDetails } from "@/lib/pokeapi";

type Props = {
  species: SpeciesDetails;
};

function formatName(value: string) {
  return value.replaceAll("-", " ");
}

export function PokemonGeneralBreeding({ species }: Props) {
  const genderRate =
    species.gender_rate === -1 ? (
      <div className="flex text-center p-2 rounded-b-lg justify-center bg-white">Genderless</div>
    ) : (
      <div className="flex text-center p-2 rounded-b-lg items-center gap-1 bg-white">
        <IconContext.Provider value={{ color: "magenta" }}>
          <IoMdFemale />
        </IconContext.Provider>
        {species.gender_rate * 12.5}% /
        <IconContext.Provider value={{ color: "blue" }}>
          <IoMdMale />
        </IconContext.Provider>
        {(8 - species.gender_rate) * 12.5}%
      </div>
    );

  return (
    <div className="flex flex-col gap-3 bg-gray-300/50 rounded-lg p-1">
      <div className="flex flex-col w-fit">
        <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-t-lg">Gender Rate</h3>
        {genderRate}
      </div>
      <div className="flex flex-col w-full">
        <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-t-lg">Egg Groups</h3>
        <div className="flex justify-center gap-2 bg-white rounded-b-lg p-2">
          {species.egg_groups.map(({ name }) => (
            <div className="capitalize px-2 py-1 bg-gray-200 rounded-md w-fit" key={name}>
              {formatName(name)}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center w-full">
        <h3 className="font-bold bg-gray-300 py-1 px-2 rounded-l-lg">Hatch Counter</h3>
        {species.hatch_counter !== null ? (
          <div className="bg-white rounded-r-lg py-1 px-2">{species.hatch_counter + 1}</div>
        ) : (
          <div className="bg-white rounded-r-lg p-2">Unknown</div>
        )}
      </div>
    </div>
  );
}
