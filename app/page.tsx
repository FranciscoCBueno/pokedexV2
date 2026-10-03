import { PokemonList } from "@/components/pokemon-list";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Pokédex</h1>
      <PokemonList />
    </main>
  );
}
