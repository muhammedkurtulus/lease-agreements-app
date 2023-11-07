"use client";

import { ConnectKitProvider } from "connectkit";
import { Address, WagmiConfig } from "wagmi";
import { ReactNode, useEffect, useState } from "react";
import { getDefaultConfig } from "connectkit";
import { createConfig } from "wagmi";
import { localhost } from "wagmi/chains";
import { Lease__factory } from "@/typechain-types";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!;

const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: "My wagmi + ConnectKit App",
    walletConnectProjectId,
    chains: [localhost],
  })
);

export const contract = {
  address: process.env.NEXT_PUBLIC_LEASE_CONTRACT as Address,
  abi: Lease__factory.abi,
} as const;

export function WalletProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>{mounted && children}</ConnectKitProvider>
    </WagmiConfig>
  );
}
