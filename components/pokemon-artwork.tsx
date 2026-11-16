"use client";

import Image from "next/image";
import { useState } from "react";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";

type PokemonArtworkProps = {
  name: string;
  genus: string | undefined;
  id: number;
  isLegendary: boolean;
  isMythical: boolean;
  artwork: string | null;
  shinyArtwork: string | null;
};

export function PokemonArtwork({
  name,
  genus,
  id,
  isLegendary,
  isMythical,
  artwork,
  shinyArtwork,
}: PokemonArtworkProps) {
  const [isShiny, setIsShiny] = useState(false);
  const displayedArtwork = isShiny ? shinyArtwork : artwork;

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => setIsShiny((current) => !current)}
          disabled={!shinyArtwork}
          className="rounded-lg bg-red-600 px-2 py-2 text-white transition-colors cursor-pointer hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isShiny ? <IoMdStar/> : <IoMdStarOutline/>}
        </button>
        {(isLegendary || isMythical) && (
          <span
            className={`rounded-xl px-2 py-1 text-sm font-semibold ${
              isMythical
                ? "bg-fuchsia-600 text-white border-1 border-rose-500"
                : "bg-amber-400 text-amber-950 border-1 border-yellow-300"
            }`}
          >
            {isMythical ? "Mythical" : "Legendary"}
          </span>
        )}
        <p className="text-right text-sm text-black bg-gray-200/50 px-2 py-1 rounded-xl">
          {genus ?? "Unknown genus"} · #{id}
        </p>
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
