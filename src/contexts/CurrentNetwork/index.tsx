/* eslint-disable no-console */

import { Chain, useEthers } from '@usedapp/core';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import {
  getCoinFlipAddress,
  getExplorerApiEndpoint,
  getNetwork,
  getRaffleAddress,
} from '@/contexts/CurrentNetwork/utils';

export interface CurrentNetworkContextType {
  currentNetwork: CurrentNetworkStateType;
  changeNetwork: (chainId: number) => Promise<void>;
}

export interface CurrentNetworkStateType {
  network: Chain;
  raffleAddress: string;
  coinFlipAddress: string;
  explorerApiEndpoint: string;
}

const CurrentNetworkContext = createContext<CurrentNetworkContextType>({} as CurrentNetworkContextType);

/*
 * Context provider that keep tracks of network dependent variables andd facilitates switching networks
 * @param children - The react children components that consume the CurrentNetworkContext
 */
export const CurrentNetworkProvider = ({ children }: { children: ReactNode }) => {
  const { switchNetwork } = useEthers();

  const [currentNetworkState, setCurrentNetworkState] = useState<CurrentNetworkStateType>({
    raffleAddress: getRaffleAddress(),
    coinFlipAddress: getCoinFlipAddress(),
    network: getNetwork(),
    explorerApiEndpoint: getExplorerApiEndpoint(),
  });

  const changeNetwork = useCallback(
    async (chainId: number) => {
      await switchNetwork(chainId);
      setCurrentNetworkState({
        network: getNetwork(chainId),
        raffleAddress: getRaffleAddress(chainId),
        coinFlipAddress: getCoinFlipAddress(chainId),
        explorerApiEndpoint: getExplorerApiEndpoint(),
      });
    },
    [switchNetwork]
  );

  return (
    <CurrentNetworkContext.Provider value={{ currentNetwork: currentNetworkState, changeNetwork }}>
      {children}
    </CurrentNetworkContext.Provider>
  );
};

export const useCurrentNetworkContext = () => useContext(CurrentNetworkContext);

export default CurrentNetworkContext;
