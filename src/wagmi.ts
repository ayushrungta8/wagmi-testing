import { http, createConfig, createConnector } from "wagmi";
import { goerli, hardhat, mainnet } from "wagmi/chains";
import { mock } from "./app/mockConnector";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [hardhat],
  ssr: true,
  connectors: [
    injected(),
    // coinbaseWallet({ appName: "Create Wagmi" }),
    mock({
      accounts: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
      features: {
        signTypedDataError: new Error("Random Error"),
        signMessageError: new Error("Random Message Error"),
        sendTransactionError: new Error("Random Transaction Error"),
      },
    }),
  ],
  transports: {
    [hardhat.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
