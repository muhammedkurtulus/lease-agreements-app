import { getDefaultConfig } from "connectkit";
import { createConfig } from "wagmi";
import { localhost } from "wagmi/chains";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!;

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: "My wagmi + ConnectKit App",
    walletConnectProjectId,
    chains: [localhost],
  })
);
