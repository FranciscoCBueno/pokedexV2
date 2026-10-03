"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { fetchPokemon, type DexItem } from "@/lib/pokeapi";
import { useColor } from "@/lib/colors/color-provider";
import type { PokemonType } from "@/lib/colors/type-colors";

export function PokemonCard({ id, name }: DexItem) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemon(id),
    staleTime: Infinity,
  });

  const artwork = data?.sprites.front_default;

  function TypeBadge({ type }: { type: PokemonType }) {
    const color = useColor("type", type);
    return (
        <span
        className="rounded-lg px-2 content-center text-xs uppercase font-semibold text-white border-2 border-white"
        style={{ backgroundColor: color }}
        >
        {type}
        </span>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-gray-400 p-4 shadow-sm cursor-pointer transition-transform hover:scale-105 active:scale-98">
      <span className="self-start text-xs text-white">
        #{String(id).padStart(4, "0")}
      </span>

      <div className="relative h-32 w-32">
        {isPending && (
          <div className="h-full w-full animate-pulse rounded-full bg-gray-200" />
        )}
        {isError && (
          <div className="flex h-full items-center justify-center text-xs text-red-500">
            Failed to load
          </div>
        )}
        {artwork && (
          <Image src={artwork} alt={name} fill sizes="128px" className="object-contain bg-white rounded-lg p-1" loading="eager"/>
        )}
      </div>

      <h2 className="font-semibold capitalize">{name}</h2>

      <div className="flex min-h-6 gap-1">
        {data?.types.map(({ type }) => (
          <TypeBadge key={type.name} type={type.name as PokemonType} />
        ))}
      </div>
    </div>
  );
}