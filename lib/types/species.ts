type FlavorTextEntry = {
  flavor_text: string;
  language: { name: string; url: string };
  version: { name: string; url: string };
};

type Genus = {
  genus: string;
  language: { name: string; url: string };
};

export type SpeciesVariety = {
  is_default: boolean;
  pokemon: { name: string; url: string };
};

export type SpeciesDetailsResponse = {
  base_happiness: number | null;
  capture_rate: number;
  egg_groups: [
    {
      name: string;
      url: string;
    }
  ];
  evolution_chain: { url: string };
  evolves_from_species: { name: string; url: string } | null;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: [
    {
      description: string;
    }
  ];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: { name: string; url: string };
  growth_rate: { name: string; url: string };
  habitat: { name: string; url: string } | null;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: unknown[];
  order: number;
  pal_park_encounters: [
    {
      base_score: number;
      rate: number;
      area: { name: string; url: string };
    }
  ];
  pokedex_numbers: unknown[];
  shape: { name: string; url: string } | null;
  varieties: SpeciesVariety[];
  color: { name: string; url: string } | null;
};

export type SpeciesDetails = Omit<
  SpeciesDetailsResponse,
  | "order"
  | "has_gender_differences"
  | "pokedex_numbers"
  | "color"
  | "names"
  | "flavor_text_entries"
  | "genera"
> & {
  flavor_text_entries: FlavorTextEntry | undefined;
  genera: Genus | undefined;
};
