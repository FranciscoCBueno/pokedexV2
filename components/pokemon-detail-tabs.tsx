"use client";

import { useState } from "react";
import type { PokemonDetails, SpeciesDetails } from "@/lib/pokeapi";
import { PokemonGeneralInfo } from "./pokemon-general-info";
import { PokemonMoves } from "./pokemon-moves";

const tabs = ["General", "Moves"] as const;

type PokemonDetailTabsProps = {
  pokemon: PokemonDetails;
  species: SpeciesDetails;
};

export function PokemonDetailTabs({
  pokemon,
  species,
}: PokemonDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("General");

  return (
    <section className="flex h-full w-full flex-1 flex-col rounded-lg px-2 text-black">
      <div className="flex gap-2 rounded-lg bg-gray-300 p-2" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer w-full rounded-lg px-4 py-2 transition-colors ${
              activeTab === tab
                ? "bg-red-600 text-white"
                : "bg-white/60 hover:bg-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-auto">
        {activeTab === "General" && (
          <PokemonGeneralInfo pokemon={pokemon} species={species} />
        )}
        {activeTab === "Moves" && <PokemonMoves />}
      </div>
    </section>
  );
}
