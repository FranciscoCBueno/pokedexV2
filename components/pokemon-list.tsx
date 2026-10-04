"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { fetchDex, fetchPokemon } from "@/lib/pokeapi";
import { useUiStore } from "@/store/ui-store";
import { PokemonCard } from "./pokemon-card";

export function PokemonList({
  dexName,
  typeName,
}: {
  dexName: string;
  typeName: string;
}) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["pokedex", dexName],
    queryFn: () => fetchDex(dexName),
    staleTime: Infinity,
  });

  const pokemonQueries = useQueries({
    queries: (data ?? []).map((item) => ({
      queryKey: ["pokemon", item.id],
      queryFn: () => fetchPokemon(item.id),
      staleTime: Infinity,
      enabled: typeName !== "all",
    })),
  });

  const filteredData =
    typeName === "all"
      ? data
      : data?.filter((item, index) =>
          pokemonQueries[index]?.data?.types.some(
            ({ type }) => type.name === typeName,
          ),
        );

  const visibleCount = useUiStore((s) => s.visibleCount);
  const loadMore = useUiStore((s) => s.loadMore);
  const resetVisibleCount = useUiStore((s) => s.resetVisibleCount);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const total = filteredData?.length ?? 0;
  const hasMore = visibleCount < total;

  useEffect(() => {
    resetVisibleCount();
  }, [dexName, typeName, resetVisibleCount]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore(total);
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, visibleCount, total, loadMore]);

  if (isPending) return <p className="p-8 text-center">Loading Pokédex…</p>;

  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="mb-2 text-black">Couldn&apos;t load the Pokédex.</p>
        <button onClick={() => refetch()} className="rounded bg-red-500 px-3 py-1 text-white">
          Retry
        </button>
      </div>
    );
  }

  if (typeName !== "all" && pokemonQueries.some((query) => query.isPending)) {
    return <p className="p-8 text-center">Loading Pokémon types…</p>;
  }

  if (typeName !== "all" && pokemonQueries.some((query) => query.isError)) {
    return <p className="p-8 text-center text-red-500">Couldn&apos;t load Pokémon types.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filteredData?.slice(0, visibleCount).map((item) => (
          <PokemonCard key={item.id} {...item}/>
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} className="h-10" />}
    </>
  );
}