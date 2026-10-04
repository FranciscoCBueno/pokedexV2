"use client";

import { FilterSelect, type FilterOption } from "./filter-select";

export const pokedexOptions: FilterOption[] = [
  { value: "national", label: "National" },
  { value: "kanto", label: "Red/Blue/Yellow" },
  { value: "original-johto", label: "Gold/Silver/Crystal" },
  { value: "hoenn", label: "Ruby/Sapphire/Emerald" },
  { value: "original-sinnoh", label: "Diamond/Pearl" },
  { value: "extended-sinnoh", label: "Platinum" },
  { value: "updated-johto", label: "HeartGold/SoulSilver" },
  { value: "original-unova", label: "Black/White" },
  { value: "updated-unova", label: "Black 2/White 2" },
  { value: "kalos-central", label: "X/Y (Central)" },
  { value: "kalos-coastal", label: "X/Y (Coastal)" },
  { value: "kalos-mountain", label: "X/Y (Mountain)" },
  { value: "updated-hoenn", label: "Omega Ruby/Alpha Sapphire" },
  { value: "original-alola", label: "Sun/Moon" },
  { value: "updated-alola", label: "Ultra Sun/Ultra Moon" },
  { value: "galar", label: "Sword/Shield" },
  { value: "hisui", label: "Legends Arceus" },
  { value: "paldea", label: "Scarlet/Violet" },
  { value: "lumiose-city", label: "Legends Z-A" },
];

type PokedexFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export function PokedexFilter({ value, onChange }: PokedexFilterProps) {
  return (
    <div >
      <div className="mx-auto flex max-w-6xl items-center gap-6">
        <FilterSelect label="Pokédex" options={pokedexOptions} value={value} onChange={onChange} />
      </div>
    </div>
  );
}
