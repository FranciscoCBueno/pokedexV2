"use client";

import { useColor } from "@/lib/colors/color-provider";
import type { PokemonType } from "@/lib/colors/type-colors";

export function TypeBadge({ type }: { type: PokemonType }) {
  const color = useColor("type", type);

  return (
    <span
      className="flex items-center rounded-lg border-2 border-white px-2 text-xs font-semibold uppercase text-white"
      style={{ backgroundColor: color }}
    >
      {type}
    </span>
  );
}
