"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";

import { config } from "@/wagmi";
import { NetworkProvider } from "./stake/_lib/context/networkAndVaultContext";

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <NetworkProvider>{props.children}</NetworkProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
