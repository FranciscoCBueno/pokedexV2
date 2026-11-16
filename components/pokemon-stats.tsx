import type { PokemonDetails } from "@/lib/pokeapi";

type PokemonStatsProps = {
  stats: PokemonDetails["stats"];
};

const statLabels: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed",
};

export function PokemonStats({ stats }: PokemonStatsProps) {
  const total = stats.reduce((sum, { base_stat }) => sum + base_stat, 0);

  return (
    <section className="w-full text-black rounded-lg bg-gray-100">
      <h2 className="mb-3 text-lg px-4 py-2 rounded-t-lg font-bold bg-gray-300">Stats</h2>
      <div className="space-y-3 px-4 pb-4">
        {stats.map(({ base_stat, stat }) => (
          <div key={stat.name} className="grid grid-cols-[7rem_1fr_3rem] items-center gap-3">
            <span className="font-semibold">{statLabels[stat.name] ?? stat.name}</span>
            <div className="h-3 overflow-hidden rounded-full bg-white border-1 border-gray-300">
              <div
                className="h-full rounded-full bg-gray-500"
                style={{ width: `${Math.min((base_stat / 255) * 100, 100)}%` }}
              />
            </div>
            <span className="text-right">{base_stat}</span>
          </div>
        ))}
        <div className="grid grid-cols-[7rem_1fr_3rem] items-center gap-3 border-t border-gray-400 pt-3">
          <span className="font-semibold">Total</span>
          <div className="h-3 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-gray-500"
              style={{ width: `${Math.min((total / 600) * 100, 100)}%` }}
            />
          </div>
          <span className="text-right">{total}</span>
        </div>
      </div>
    </section>
  );
}
