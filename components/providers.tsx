"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ColorProvider } from "@/lib/colors/color-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  // useState so the client isn't recreated on every render
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ColorProvider>{children}</ColorProvider>
    </QueryClientProvider>
  );
}