/* eslint-disable no-console */

import { Chain, useEthers } from '@usedapp/core';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import {
  getCoinFlipAddress,
  getColorAccent,
  getExplorerApiEndpoint,
  getNetwork,
  getRaffleAddress,
} from '@/contexts/CurrentNetwork/utils';

export interface CurrentNetworkContextType {
  currentNetwork: CurrentNetworkStateType;
  changeNetwork: (chainId: number) => Promise<void>;
  colorAccent: string;
}

export interface CurrentNetworkStateType {
  network: Chain;
  raffleAddress: string;
  coinFlipAddress: string;
  explorerApiEndpoint: string;
  currencySymbol: string;
  rpcUrl: string;
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
    currencySymbol: getNetwork().nativeCurrency?.symbol || 'ERROR',
    rpcUrl: getNetwork().rpcUrl || 'ERROR',
  });

  const [colorAccent, setColorAccent] = useState(getColorAccent());

  const changeNetwork = useCallback(
    async (chainId: number) => {
      await switchNetwork(chainId);
      setCurrentNetworkState({
        network: getNetwork(chainId),
        raffleAddress: getRaffleAddress(chainId),
        coinFlipAddress: getCoinFlipAddress(chainId),
        explorerApiEndpoint: getExplorerApiEndpoint(),
        currencySymbol: getNetwork(chainId).nativeCurrency?.symbol || 'ERROR',
        rpcUrl: getNetwork(chainId).rpcUrl || 'ERROR',
      });
      setColorAccent(getColorAccent(chainId));
    },
    [switchNetwork]
  );

  return (
    <CurrentNetworkContext.Provider value={{ currentNetwork: currentNetworkState, changeNetwork, colorAccent }}>
      {children}
    </CurrentNetworkContext.Provider>
  );
};

export const useCurrentNetworkContext = () => useContext(CurrentNetworkContext);

export default CurrentNetworkContext;
