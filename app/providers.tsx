"use client";

import { ConnectKitProvider } from "connectkit";
import { WagmiConfig } from "wagmi";
import { config } from "../utils/wagmi";
import { ReactNode, useEffect, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>{mounted && children}</ConnectKitProvider>
    </WagmiConfig>
  );
}
