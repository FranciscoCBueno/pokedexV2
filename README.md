# Pokédex

A Pokédex web app powered by the [PokéAPI](https://pokeapi.co/). Browse Pokémon, filter the Pokédex, and view individual Pokémon details, including stats, abilities, evolutions, moves, and locations.

## Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- TanStack Query for client-side data fetching and caching
- PokéAPI for Pokémon data

## Project structure

- `app/` — Next.js routes and app layout, including the Pokémon detail route
- `components/` — Pokédex, filters, and Pokémon detail UI
- `lib/pokeapi.ts` — PokéAPI request functions
- `lib/types/` — API and application data types
- `lib/colors/` — Pokémon type colors and color context
- `public/backgrounds/` — Type-themed background images
- `store/` — Application state

## Run locally

Requirements: Node.js and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Other commands

```bash
npm run lint  # Run ESLint
npm run build # Create a production build
npm run start # Serve the production build
```
