"use client";

import { useEffect, useState } from "react";

type SearchFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

const SEARCH_DELAY = 300;

export function SearchFilter({ value, onChange }: SearchFilterProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onChange(inputValue.trim().toLowerCase());
    }, SEARCH_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [inputValue, onChange]);

  return (
    <label className="flex items-center gap-3 font-semibold w-full">
      <span className="shrink-0 text-black">Search:</span>
      <input
        type="search"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Pokémon name"
        className="w-full min-w-0 rounded border border-gray-300 bg-white px-3 py-2 font-normal text-black"
      />
    </label>
  );
}
