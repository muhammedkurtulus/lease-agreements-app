"use client";

import { ConnectKitButton } from "connectkit";
import { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  const { isConnected } = useAccount();

  useEffect(() => {
    console.log(address);
  }, [address]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConnectKitButton />
    </main>
  );
}
