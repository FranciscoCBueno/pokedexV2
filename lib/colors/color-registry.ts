import { typeColors } from "./type-colors";

// Add more categories here as they come up, e.g. stat colors, gen colors.
export const defaultColorRegistry = {
  type: typeColors,
};

export type ColorRegistry = typeof defaultColorRegistry;
export type ColorCategory = keyof ColorRegistry;