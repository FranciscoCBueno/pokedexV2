"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPokemonLocationAreaEncounters,
  type PokemonDetails,
} from "@/lib/pokeapi";

type PokemonLocationsProps = {
  pokemon: PokemonDetails;
};

const versionGroups = [
  { id: "red-blue", label: "Red/Blue", versions: ["red", "blue"] },
  { id: "yellow", label: "Yellow", versions: ["yellow"] },
  { id: "gold-silver", label: "Gold/Silver", versions: ["gold", "silver"] },
  { id: "crystal", label: "Crystal", versions: ["crystal"] },
  {
    id: "ruby-sapphire",
    label: "Ruby/Sapphire",
    versions: ["ruby", "sapphire"],
  },
  { id: "emerald", label: "Emerald", versions: ["emerald"] },
  {
    id: "firered-leafgreen",
    label: "FireRed/LeafGreen",
    versions: ["firered", "leafgreen"],
  },
  {
    id: "diamond-pearl",
    label: "Diamond/Pearl",
    versions: ["diamond", "pearl"],
  },
  { id: "platinum", label: "Platinum", versions: ["platinum"] },
  {
    id: "heartgold-soulsilver",
    label: "HeartGold/SoulSilver",
    versions: ["heartgold", "soulsilver"],
  },
  { id: "black-white", label: "Black/White", versions: ["black", "white"] },
  {
    id: "black-2-white-2",
    label: "Black 2/White 2",
    versions: ["black-2", "white-2"],
  },
  { id: "x-y", label: "X/Y", versions: ["x", "y"] },
  {
    id: "omega-ruby-alpha-sapphire",
    label: "Omega Ruby/Alpha Sapphire",
    versions: ["omega-ruby", "alpha-sapphire"],
  },
  { id: "sun-moon", label: "Sun/Moon", versions: ["sun", "moon"] },
  {
    id: "ultra-sun-ultra-moon",
    label: "Ultra Sun/Ultra Moon",
    versions: ["ultra-sun", "ultra-moon"],
  },
  {
    id: "lets-go-pikachu-lets-go-eevee",
    label: "Let's Go Pikachu/Let's Go Eevee",
    versions: ["lets-go-pikachu", "lets-go-eevee"],
  },
  {
    id: "sword-shield",
    label: "Sword/Shield",
    versions: ["sword", "shield"],
  },
  {
    id: "brilliant-diamond-and-shining-pearl",
    label: "Brilliant Diamond/Shining Pearl",
    versions: ["brilliant-diamond", "shining-pearl"],
  },
  {
    id: "legends-arceus",
    label: "Legends: Arceus",
    versions: ["legends-arceus"],
  },
  {
    id: "scarlet-violet",
    label: "Scarlet/Violet",
    versions: ["scarlet", "violet"],
  },
] as const;

function getVersionGroup(version: string) {
  return (
    versionGroups.find((group) =>
      group.versions.some((groupVersion: string) => groupVersion === version),
    )?.id ?? version
  );
}

function formatName(value: string) {
  return value.replaceAll("-", " ");
}

function LocationSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={index}
          className="h-28 animate-pulse rounded-lg bg-gray-300/70"
        />
      ))}
    </div>
  );
}

export function PokemonLocations({ pokemon }: PokemonLocationsProps) {
  const [selectedVersion, setSelectedVersion] = useState("");
  const { data, isPending, isError } = useQuery({
    queryKey: [
      "pokemon-location-area-encounters",
      pokemon.location_area_encounters,
    ],
    queryFn: () =>
      fetchPokemonLocationAreaEncounters(pokemon.location_area_encounters),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const availableVersions = useMemo(() => {
    const availableGroups = new Set<string>();
    data?.forEach(({ version_details }) =>
      version_details.forEach(({ version }) => {
        availableGroups.add(getVersionGroup(version.name));
      }),
    );

    return versionGroups.filter(({ id }) => availableGroups.has(id));
  }, [data]);
  const activeVersion =
    availableVersions.find(({ id }) => id === selectedVersion)?.id ??
    availableVersions.at(-1)?.id ??
    "";

  const locations = useMemo(
    () =>
      data?.flatMap(({ location_area, version_details }) => {
        const encounters = version_details.flatMap(
          ({ encounter_details, version }) =>
            getVersionGroup(version.name) === activeVersion
              ? encounter_details.map((encounter) => ({
                  ...encounter,
                  version: version.name,
                }))
              : [],
        );

        return encounters.length > 0
          ? [{ location: location_area, encounters }]
          : [];
      }) ?? [],
    [activeVersion, data],
  );

  return (
    <div className="float-right mt-2 flex min-h-full w-fit flex-col rounded-lg bg-gray-200/50 p-2 backdrop-blur-sm">
      {availableVersions.length > 0 && (
        <div className="sticky top-4 z-10 mb-3 flex flex-wrap gap-2 rounded-md bg-gray-300/40 p-2 backdrop-blur-sm">
          <label className="flex items-center gap-2 font-semibold">
            Version:
            <select
              value={activeVersion}
              onChange={(event) => setSelectedVersion(event.target.value)}
              className="rounded border border-gray-300 bg-white px-2 py-1 font-normal"
            >
              {availableVersions.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      {isPending ? (
        <LocationSkeleton />
      ) : isError ? (
        <p className="rounded-lg bg-gray-200/50 p-4 text-red-600">
          Couldn&apos;t load Pokémon locations.
        </p>
      ) : locations.length > 0 ? (
        <div className="flex flex-col gap-2 pb-4">
          {locations.map(({ location, encounters }) => (
            <article
              key={location.url}
              className="rounded-lg bg-white text-black shadow-sm"
            >
              <h3 className="rounded-t-lg bg-gray-300 p-2 font-bold capitalize">
              {formatName(location.name)}
              </h3>
              <ul className="flex flex-col gap-2 p-2">
                {encounters.map((encounter, index) => (
                  <li
                    key={`${encounter.version}-${encounter.method.name}-${index}`}
                    className="flex flex-col rounded-lg border border-gray-300 bg-gray-100 text-sm"
                  >
                    <div className="flex bg-gray-200 p-2 rounded-t-lg justify-between">
                      <span className="capitalize">
                        {formatName(encounter.version)}
                      </span>
                      <span>
                        {encounter.min_level === encounter.max_level
                          ? `Level: ${encounter.min_level}`
                          : `Min level: ${encounter.min_level} · Max level: ${encounter.max_level}`}
                      </span>
                    </div>
                    <div className="flex justify-around w-full p-2">
                      <span>Chance: {encounter.chance}%</span>
                      <span className="capitalize">
                        Method: {formatName(encounter.method.name)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-lg bg-gray-200/50 p-4 text-black">
          No Pokémon locations are available for this version.
        </p>
      )}
    </div>
  );
}
