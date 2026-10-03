"use client";

import { createContext, useContext, useMemo } from "react";
import { defaultColorRegistry, type ColorRegistry, type ColorCategory } from "./color-registry";

const ColorContext = createContext<ColorRegistry>(defaultColorRegistry);

type ColorProviderProps = {
  children: React.ReactNode;
  overrides?: Partial<ColorRegistry>;
};

export function ColorProvider({ children, overrides }: ColorProviderProps) {
  const value = useMemo(
    () => ({ ...defaultColorRegistry, ...overrides }),
    [overrides],
  );

  return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>;
}

export function useColorRegistry() {
  return useContext(ColorContext);
}

export function useColor<C extends ColorCategory>(
  category: C,
  key: keyof ColorRegistry[C],
): string {
  const registry = useColorRegistry();
  return registry[category][key] as string;
}