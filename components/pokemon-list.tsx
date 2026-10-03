"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { fetchNationalDex } from "@/lib/pokeapi";
import { useUiStore } from "@/store/ui-store";
import { PokemonCard } from "./pokemon-card";

export function PokemonList() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["pokedex", "national"],
    queryFn: fetchNationalDex,
    staleTime: Infinity,
  });

  const visibleCount = useUiStore((s) => s.visibleCount);
  const loadMore = useUiStore((s) => s.loadMore);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const total = data?.length ?? 0;
  const hasMore = visibleCount < total;

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

  if (isError)
    return (
      <div className="p-8 text-center">
        <p className="mb-2">Couldn't load the Pokédex.</p>
        <button onClick={() => refetch()} className="rounded bg-red-500 px-3 py-1 text-white">
          Retry
        </button>
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data.slice(0, visibleCount).map((item) => (
          <PokemonCard key={item.id} {...item}/>
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} className="h-10" />}
    </>
  );
}