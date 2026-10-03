import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-10 w-full bg-[#ff0000ee] backdrop-blur-sm">
      <div className="max-w-6xl px-6 py-4">
        <Link href="/" className="text-lg font-bold">
          Pokédex
        </Link>
      </div>
    </nav>
  );
}
