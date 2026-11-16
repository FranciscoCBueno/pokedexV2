"use client";

import Image from "next/image";
import { useState } from "react";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";

type PokemonArtworkProps = {
  name: string;
  genus: string | undefined;
  id: number;
  artwork: string | null;
  shinyArtwork: string | null;
};

export function PokemonArtwork({
  name,
  genus,
  id,
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
