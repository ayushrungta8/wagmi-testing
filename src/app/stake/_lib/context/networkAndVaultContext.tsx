import { Networks } from "@chorus-one/opus-pool";
import React, { createContext, useContext } from "react";
import { Hex } from "viem";

type networkContextType = {
  networkType: Networks;
  setNetworkType: (value: Networks) => void;
  wrongNetwork: boolean;
  setWrongNetwork: (value: boolean) => void;
  allVaultsForChain: Hex[] | undefined;
  setAllVaultsForChain: (value: Hex[]) => void;
  selectedVaultDetails: Hex | undefined;
  setSelectedVaultDetails: (value: Hex) => void;
};

type Props = {
  children: React.ReactNode;
};

const networkContexDefault: networkContextType = {
  networkType: Networks.Holesky,
  setNetworkType: () => {},
  wrongNetwork: false,
  setWrongNetwork: () => {},
  allVaultsForChain: undefined,
  setAllVaultsForChain: () => [],
  selectedVaultDetails: undefined,
  setSelectedVaultDetails: () => [],
};

const NetworkContext = createContext<networkContextType>(networkContexDefault);

const useNetworkAndVaultContext = () => {
  return useContext(NetworkContext);
};

function NetworkProvider({ children }: Props) {
  const [networkType, setNetworkType] = React.useState<Networks>(
    Networks.Hardhat
  );
  const [wrongNetwork, setWrongNetwork] = React.useState<boolean>(false);
  const [allVaultsForChain, setAllVaultsForChain] = React.useState<
    Hex[] | undefined
  >(undefined);
  const [selectedVaultDetails, setSelectedVaultDetails] = React.useState<
    Hex | undefined
  >("0xd68af28aee9536144d4b9b6c0904caf7e794b3d3");

  const value = {
    networkType,
    setNetworkType,
    wrongNetwork,
    setWrongNetwork,
    allVaultsForChain,
    setAllVaultsForChain,
    selectedVaultDetails,
    setSelectedVaultDetails,
  };

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
}

export { useNetworkAndVaultContext, NetworkProvider, NetworkContext };
