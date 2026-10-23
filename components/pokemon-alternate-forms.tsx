import Image from "next/image";
import Link from "next/link";
import {
  fetchPokemonDetails,
  type SpeciesDetails,
} from "@/lib/pokeapi";

type PokemonAlternateFormsProps = {
  species: SpeciesDetails;
};

function formatFormName(name: string, baseName: string) {
  const suffix = name.startsWith(`${baseName}-`)
    ? name.slice(baseName.length + 1)
    : name;
  const words = suffix.split("-");

  if (words[0] === "mega") {
    return `Mega ${baseName}${words[1] ? ` ${words.slice(1).join(" ")}` : ""}`;
  }

  if (words[0] === "gmax") {
    return `G-Max ${baseName}`;
  }

  return `${baseName} (${words.join(" ")})`;
}

function getId(url: string) {
  return Number(url.split("/").at(-2));
}

type AlternateForm = {
  id: number;
  name: string;
  artwork: string | null;
};

async function loadAlternateForm(
  pokemon: SpeciesDetails["varieties"][number]["pokemon"],
  baseName: string,
): Promise<AlternateForm> {
  const details = await fetchPokemonDetails(pokemon.url);

  return {
    id: getId(pokemon.url),
    name: formatFormName(details.name, baseName),
    artwork: details.sprites.other["official-artwork"].front_default,
  };
}

export async function PokemonAlternateForms({
  species,
}: PokemonAlternateFormsProps) {
  const alternateForms = species.varieties.filter(
    (variety) => !variety.is_default,
  );

  if (alternateForms.length === 0) {
    return null;
  }

  const forms = await Promise.all(
    alternateForms.map(({ pokemon }) =>
      loadAlternateForm(pokemon, species.name),
    ),
  );

  return (
    <section className="flex h-fit w-fit flex-col items-center gap-2 rounded-lg bg-gray-300/50 p-2">
      <h2 className="w-full rounded-lg bg-gray-200 px-3 py-2 text-center font-bold text-black">
        Alternate Forms
      </h2>
      <div className="flex flex-col justify-center gap-2">
        {forms.map((form) => (
          <Link
            key={form.id}
            href={`/pokemon/${form.id}`}
            className="flex w-28 flex-col items-center rounded-lg border-2 border-gray-500 bg-white transition-transform hover:scale-105"
          >
            {form.artwork && (
              <Image
                src={form.artwork}
                alt={form.name}
                width={96}
                height={96}
                className="m-2"
              />
            )}
            <span className="w-full rounded-b-lg bg-gray-200 p-1 text-center capitalize text-black">
              {form.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
