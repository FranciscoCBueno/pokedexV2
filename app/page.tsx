"use client";

import { useState } from "react";
import { PokedexFilter } from "@/components/pokedex-filter";
import { PokemonList } from "@/components/pokemon-list";
import { SearchFilter } from "@/components/search-filter";
import { TypeFilter } from "@/components/type-filter";

export default function Home() {
  const [dexName, setDexName] = useState("national");
  const [typeName, setTypeName] = useState("all");
  const [searchName, setSearchName] = useState("");

  return (
    <main className="mx-auto max-w-6xl px-6 pb-6 pt-10">
      <div className="flex sticky top-18 mb-5 justify-center gap-6 z-10 bg-gray-200/50 px-6 py-3 rounded-lg shadow-sm backdrop-blur-sm">
        <PokedexFilter value={dexName} onChange={setDexName} />
        <TypeFilter value={typeName} onChange={setTypeName} />
        <SearchFilter value={searchName} onChange={setSearchName} />
      </div>
      <PokemonList
        dexName={dexName}
        typeName={typeName}
        searchName={searchName}
      />
    </main>
  );
}
