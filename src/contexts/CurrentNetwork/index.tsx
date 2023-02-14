/* eslint-disable no-console */

import { useEthers } from '@usedapp/core';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import {
  CurrentNetworkStateType,
  getBetAmounts,
  getCoinFlipAddress,
  getColorAccent,
  getColorAccentText,
  getCurrentNetworkState,
  getExplorerApiEndpoint,
  getNetwork,
  getRaffleAddress,
} from '@/contexts/CurrentNetwork/utils';

export interface CurrentNetworkContextType {
  currentNetwork: CurrentNetworkStateType;
  changeNetwork: (chainId: number) => Promise<void>;
  colorAccent: string;
  colorAccentText: string;
}

const CurrentNetworkContext = createContext<CurrentNetworkContextType>({} as CurrentNetworkContextType);

/*
 * Context provider that keep tracks of network dependent variables andd facilitates switching networks
 * @param children - The react children components that consume the CurrentNetworkContext
 */
export const CurrentNetworkProvider = ({ children }: { children: ReactNode }) => {
  const { switchNetwork, chainId } = useEthers();

  const [currentNetworkState, setCurrentNetworkState] = useState<CurrentNetworkStateType>({
    raffleAddress: getRaffleAddress(),
    coinFlipAddress: getCoinFlipAddress(),
    network: getNetwork(),
    explorerApiEndpoint: getExplorerApiEndpoint(),
    currencySymbol: getNetwork().nativeCurrency?.symbol || 'ERROR',
    rpcUrl: getNetwork().rpcUrl || 'ERROR',
    betAmounts: getBetAmounts(),
  });

  const [colorAccent, setColorAccent] = useState(getColorAccent());
  const [colorAccentText, setColorAccentText] = useState(getColorAccentText());

  const changeNetwork = useCallback(
    async (_chainId: number) => {
      await switchNetwork(_chainId);
      setCurrentNetworkState(getCurrentNetworkState(_chainId));
      setColorAccent(getColorAccent(_chainId));
      setColorAccentText(getColorAccentText(_chainId));
    },
    [switchNetwork]
  );

  useEffect(() => {
    if (chainId !== undefined && chainId !== currentNetworkState.network.chainId) {
      setCurrentNetworkState(getCurrentNetworkState(chainId));
      setColorAccent(getColorAccent(chainId));
      setColorAccentText(getColorAccentText(chainId));
    }
  }, [chainId]);

  return (
    <CurrentNetworkContext.Provider
      value={{ currentNetwork: currentNetworkState, changeNetwork, colorAccent, colorAccentText }}
    >
      {children}
    </CurrentNetworkContext.Provider>
  );
};

export const useCurrentNetworkContext = () => useContext(CurrentNetworkContext);

export default CurrentNetworkContext;
