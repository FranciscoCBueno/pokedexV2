"use client";

import { useState } from "react";
import { PokedexFilter } from "@/components/pokedex-filter";
import { PokemonList } from "@/components/pokemon-list";
import { TypeFilter } from "@/components/type-filter";

export default function Home() {
  const [dexName, setDexName] = useState("national");
  const [typeName, setTypeName] = useState("all");

  return (
    <main className="mx-auto max-w-6xl px-6 pb-6 pt-48">
      <div className="flex fixed top-18 justify-center gap-6 z-10 w-fit bg-white/90 px-6 py-3 rounded-lg shadow-sm backdrop-blur-sm">
        <PokedexFilter value={dexName} onChange={setDexName} />
          <div className="flex max-w-6xl items-center gap-6">
            <TypeFilter value={typeName} onChange={setTypeName} />
          </div>
      </div>
      <PokemonList dexName={dexName} typeName={typeName} />
    </main>
  );
}
