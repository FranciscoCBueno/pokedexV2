"use client";

import { useQueries } from "@tanstack/react-query";
import {
  fetchPokemonType,
  type PokemonDetails,
  type PokemonTypeDetails,
} from "@/lib/pokeapi";
import { useColor } from "@/lib/colors/color-provider";
import { type PokemonType, typeColors } from "@/lib/colors/type-colors";

const typeNames = Object.keys(typeColors) as PokemonType[];

type PokemonTypeEffectivenessProps = {
  types: PokemonDetails["types"];
};

function getMultiplier(
  typeName: string,
  typeDetails: PokemonTypeDetails[],
) {
  return typeDetails.reduce((multiplier, details) => {
    const { no_damage_from, half_damage_from, double_damage_from } =
      details.damage_relations;

    if (no_damage_from.some(({ name }) => name === typeName)) {
      return multiplier * 0;
    }
    if (half_damage_from.some(({ name }) => name === typeName)) {
      return multiplier / 2;
    }
    if (double_damage_from.some(({ name }) => name === typeName)) {
      return multiplier * 2;
    }
    return multiplier;
  }, 1);
}

function formatMultiplier(multiplier: number) {
  if (multiplier === 0) return "0";
  if (multiplier === 0.25) return "1/4";
  if (multiplier === 0.5) return "1/2";
  return String(multiplier);
}

function EffectivenessCell({
  typeName,
  multiplier,
}: {
  typeName: PokemonType;
  multiplier: number;
}) {
  const color = useColor("type", typeName);

  return (
    <div
      className="flex flex-col items-center rounded-md p-1 text-center"
      style={{ backgroundColor: color }}
    >
      <span className="w-full text-white font-bold capitalize">{typeName}</span>
      <span className="w-full rounded-md bg-gray-200 text-center">
        {formatMultiplier(multiplier)}
      </span>
    </div>
  );
}

export function PokemonTypeEffectiveness({
  types,
}: PokemonTypeEffectivenessProps) {
  const typeQueries = useQueries({
    queries: types.map(({ type }) => ({
      queryKey: ["pokemon-type", type.url],
      queryFn: () => fetchPokemonType(type.url),
      staleTime: Infinity,
    })),
  });

  if (typeQueries.some((query) => query.isPending)) {
    return <p className="rounded-lg bg-gray-200/50 p-3">Loading type effectiveness…</p>;
  }

  if (typeQueries.some((query) => query.isError)) {
    return (
      <p className="rounded-lg bg-gray-200/50 p-3 text-red-600">
        Couldn&apos;t load type effectiveness.
      </p>
    );
  }

  const typeDetails = typeQueries
    .map((query) => query.data)
    .filter((details): details is PokemonTypeDetails => details !== undefined);

  return (
    <section className="w-full rounded-lg bg-gray-300/50 p-2 backdrop-blur-sm">
      <h3 className="rounded-t-md bg-gray-300 px-2 py-1 font-bold">
        Damage Taken
      </h3>
      <div className="grid grid-cols-3 gap-1 rounded-b-sm bg-white p-2 sm:grid-cols-6 md:grid-cols-9">
        {typeNames.map((typeName) => (
          <EffectivenessCell
            key={typeName}
            typeName={typeName}
            multiplier={getMultiplier(typeName, typeDetails)}
          />
        ))}
      </div>
    </section>
  );
}
