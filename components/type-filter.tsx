"use client";

import { FilterSelect, type FilterOption } from "./filter-select";

export const typeOptions: FilterOption[] = [
  { value: "all", label: "All types" },
  { value: "normal", label: "Normal" },
  { value: "fire", label: "Fire" },
  { value: "water", label: "Water" },
  { value: "electric", label: "Electric" },
  { value: "grass", label: "Grass" },
  { value: "ice", label: "Ice" },
  { value: "fighting", label: "Fighting" },
  { value: "poison", label: "Poison" },
  { value: "ground", label: "Ground" },
  { value: "flying", label: "Flying" },
  { value: "psychic", label: "Psychic" },
  { value: "bug", label: "Bug" },
  { value: "rock", label: "Rock" },
  { value: "ghost", label: "Ghost" },
  { value: "dragon", label: "Dragon" },
  { value: "dark", label: "Dark" },
  { value: "steel", label: "Steel" },
  { value: "fairy", label: "Fairy" },
];

type TypeFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TypeFilter({ value, onChange }: TypeFilterProps) {
  return (
    <FilterSelect label="Type" options={typeOptions} value={value} onChange={onChange} />
  );
}
