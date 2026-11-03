"use client";

import { useMemo, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import {
  fetchPokemonMove,
  type PokemonDetails,
  type PokemonMoveDetails,
} from "@/lib/pokeapi";
import { isPokemonType, type PokemonType } from "@/lib/colors/type-colors";
import { TypeBadge } from "./type-badge";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { IoDiscOutline } from "react-icons/io5";

type PokemonMovesProps = {
  pokemon: PokemonDetails;
};

type VersionGroupDetails = PokemonDetails["moves"][number]["version_group_details"][number];

const learnMethodLabels: Record<string, string> = {
  "level-up": "Level Up",
  machine: "Machine",
  tutor: "Tutor",
  "egg": "Egg",
  "stadium-surfing-pikachu": "Stadium Surfing Pikachu",
  "light-ball-egg": "Light Ball Egg",
  "colosseum-purification": "Colosseum Purification",
  "xd-shadow": "XD Shadow",
  "xd-purification": "XD Purification",
  "form-change": "Form Change",
};

const mainlineVersionGroups = [
  "red-blue",
  "yellow",
  "gold-silver",
  "crystal",
  "ruby-sapphire",
  "emerald",
  "firered-leafgreen",
  "diamond-pearl",
  "platinum",
  "heartgold-soulsilver",
  "black-white",
  "black-2-white-2",
  "x-y",
  "omega-ruby-alpha-sapphire",
  "sun-moon",
  "ultra-sun-ultra-moon",
  "sword-shield",
  "brilliant-diamond-and-shining-pearl",
  "scarlet-violet",
] as const;

const versionGroupLabels: Record<string, string> = {
  "red-blue": "Red/Blue",
  yellow: "Yellow",
  "gold-silver": "Gold/Silver",
  crystal: "Crystal",
  "ruby-sapphire": "Ruby/Sapphire",
  emerald: "Emerald",
  "firered-leafgreen": "FireRed/LeafGreen",
  "diamond-pearl": "Diamond/Pearl",
  platinum: "Platinum",
  "heartgold-soulsilver": "HeartGold/SoulSilver",
  "black-white": "Black/White",
  "black-2-white-2": "Black2/White2",
  "x-y": "X/Y",
  "omega-ruby-alpha-sapphire": "Omega Ruby/Alpha Sapphire",
  "sun-moon": "Sun/Moon",
  "ultra-sun-ultra-moon": "Ultra Sun/Ultra Moon",
  "sword-shield": "Sword/Shield",
  "brilliant-diamond-and-shining-pearl": "Brilliant Diamond/Shining Pearl",
  "scarlet-violet": "Scarlet/Violet",
};

function formatName(value: string) {
  return value.replaceAll("-", " ");
}

function getLearnMethodLabel(value: string) {
  return learnMethodLabels[value] ?? formatName(value);
}

function MoveSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 12 }, (_, index) => (
        <div
          key={index}
          className="h-32 animate-pulse rounded-lg bg-gray-300/70"
        />
      ))}
    </div>
  );
}

function MoveCard({
  move,
  details,
  versionDetails,
}: {
  move: PokemonDetails["moves"][number]["move"];
  details: PokemonMoveDetails;
  versionDetails: VersionGroupDetails;
}) {
  const type = isPokemonType(details.type.name)
    ? (details.type.name as PokemonType)
    : null;
  const learnMethod = versionDetails.move_learn_method.name;

  return (
    <div className="rounded-lg bg-white text-black shadow-sm">
      <div className="mb-2 rounded-t-lg p-2 bg-gray-300 flex items-center justify-between gap-2">
        <h3 className="font-bold capitalize">{formatName(move.name)}</h3>
        {type && <TypeBadge type={type} />}
      </div>
      <div className="flex justify-between text-sm px-2 pb-2">
        <div className="grid grid-cols-2 w-fit rounded-lg">
          <span className="flex justify-center items-center px-1 bg-gray-200 rounded-tl-lg border-1 border-gray-400">Power: {details.power ?? "—"}</span>
          <span className="flex justify-center items-center px-1 bg-gray-200 rounded-tr-lg border-1 border-gray-400">Accuracy: {details.accuracy ?? "—"}</span>
          <span className="flex justify-center items-center px-1 bg-gray-200 rounded-bl-lg border-1 border-gray-400">PP: {details.pp ?? "—"}</span>
          <span className="flex justify-center items-center px-1 bg-gray-200 rounded-br-lg border-1 border-gray-400">Priority: {details.priority}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-1 capitalize bg-gray-200 p-1 rounded-lg border-1 border-gray-400">
            {learnMethod === "level-up" && (
              <IoArrowUpCircleOutline />
            )}
            {learnMethod === "machine" && (
              <IoDiscOutline />
            )}
            {getLearnMethodLabel(learnMethod)}
            {versionDetails.level_learned_at > 0
              ? `: ${versionDetails.level_learned_at}`
              : ""}
          </span>
          <span className="capitalize bg-gray-200 p-1 rounded-lg border-1 border-gray-400">
            Class: {formatName(details.damage_class.name)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function PokemonMoves({ pokemon }: PokemonMovesProps) {
  const versionGroups = useMemo(() => {
    const availableGroups = new Set<string>();
    pokemon.moves.forEach((move) =>
      move.version_group_details.forEach(({ version_group }) => {
        availableGroups.add(version_group.name);
      }),
    );
    return mainlineVersionGroups.filter((version) =>
      availableGroups.has(version),
    );
  }, [pokemon.moves]);
  const [selectedVersion, setSelectedVersion] = useState(
    versionGroups.at(-1) ?? "",
  );

  const moveQueries = useQueries({
    queries: pokemon.moves.map(({ move }) => ({
      queryKey: ["pokemon-move", move.url],
      queryFn: () => fetchPokemonMove(move.url),
      staleTime: Infinity,
    })),
  });

  const selectedMoves = pokemon.moves.flatMap((move, index) => {
    const versionDetails = move.version_group_details.find(
      ({ version_group }) => version_group.name === selectedVersion,
    );
    const details = moveQueries[index]?.data;

    return versionDetails && details
      ? [{ move: move.move, details, versionDetails }]
      : [];
  });
  const learnMethods = ["level-up", "machine", "tutor"];
  const [selectedMethod, setSelectedMethod] = useState("level-up");
  const visibleMoves = selectedMoves
    .filter(
      ({ versionDetails }) =>
        versionDetails.move_learn_method.name === selectedMethod,
    )
    .sort((firstMove, secondMove) =>
      selectedMethod === "level-up"
        ? firstMove.versionDetails.level_learned_at -
          secondMove.versionDetails.level_learned_at
        : 0,
    );

  return (
    <div className="flex min-h-full flex-col w-fit float-right mt-2 bg-gray-200/50 backdrop-blur-sm p-2 rounded-lg">
      <div className="sticky rounded-md top-4 z-10 mb-3 flex flex-wrap gap-2 p-2 bg-gray-300/40 backdrop-blur-sm">
        <label className="flex items-center gap-2 font-semibold">
          Version:
          <select
            value={selectedVersion}
            onChange={(event) => {
              setSelectedVersion(event.target.value);
            }}
            className="rounded border border-gray-300 bg-white px-2 py-1 font-normal"
          >
            {versionGroups.map((version) => (
              <option key={version} value={version}>
                {versionGroupLabels[version]}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-wrap gap-1" role="tablist">
          {learnMethods.map((method) => (
            <button
              key={method}
              type="button"
              role="tab"
              aria-selected={selectedMethod === method}
              onClick={() => setSelectedMethod(method)}
              className={`rounded px-3 py-1 capitalize ${
                selectedMethod === method
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {getLearnMethodLabel(method)}
            </button>
          ))}
        </div>
      </div>
      {moveQueries.some((query) => query.isPending) ? (
        <MoveSkeleton />
      ) : moveQueries.some((query) => query.isError) ? (
        <p className="rounded-lg bg-gray-200/50 p-4 text-red-600">
          Couldn&apos;t load Pokémon moves.
        </p>
      ) : (
        <div className="flex flex-col gap-2 pb-4">
          {visibleMoves.length > 0 ? (
            visibleMoves.map(({ move, details, versionDetails }) => (
              <MoveCard
                key={`${move.url}-${selectedVersion}`}
                move={move}
                details={details}
                versionDetails={versionDetails}
              />
            ))
          ) : (
            <p className="rounded-lg bg-white/70 p-4 text-center text-black shadow-sm">
              No moves available in this category
            </p>
          )}
        </div>
      )}
    </div>
  );
}
