"use client";

import Image from "next/image";
import { useState } from "react";

type PokemonArtworkProps = {
  name: string;
  artwork: string | null;
  shinyArtwork: string | null;
};

export function PokemonArtwork({
  name,
  artwork,
  shinyArtwork,
}: PokemonArtworkProps) {
  const [isShiny, setIsShiny] = useState(false);
  const displayedArtwork = isShiny ? shinyArtwork : artwork;

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full pt-2">
        <button
          type="button"
          onClick={() => setIsShiny((current) => !current)}
          disabled={!shinyArtwork}
          className="rounded-lg bg-red-600 px-2 py-1 text-white transition-colors cursor-pointer hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isShiny ? "★" : "☆"}
        </button>
      </div>
      {displayedArtwork && (
        <Image
          src={displayedArtwork}
          alt={`${isShiny ? "Shiny " : ""}${name}`}
          width={400}
          height={400}
          priority
        />
      )}
    </div>
  );
}
