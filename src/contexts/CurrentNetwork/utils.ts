import { Chain } from '@usedapp/core';

import {
  chainBetAmounts,
  chainColorAccents,
  chainColorAccentsText,
  chains,
  contractAddresses,
  explorerApiEndpoints,
  getDefaultChainId,
} from '@/config';

export interface CurrentNetworkStateType {
  network: Chain;
  raffleAddress: string;
  coinFlipAddress: string;
  explorerApiEndpoint: string;
  currencySymbol: string;
  rpcUrl: string;
  betAmounts: number[];
}

export const getCoinFlipAddress = (chainId?: number): string => {
  if (!chainId || !contractAddresses[chainId]) {
    return contractAddresses[getDefaultChainId()].coinFlipAddress;
  }
  return contractAddresses[chainId].coinFlipAddress;
};

export const getRaffleAddress = (chainId?: number): string => {
  if (!chainId || !contractAddresses[chainId]) {
    return contractAddresses[getDefaultChainId()].raffleAddress;
  }
  return contractAddresses[chainId].raffleAddress;
};

export const getNetwork = (chainId?: number): Chain => {
  if (!chainId || !chains[chainId]) {
    return chains[getDefaultChainId()];
  }
  return chains[chainId];
};

export const getExplorerApiEndpoint = (chainId?: number): string => {
  if (!chainId || !explorerApiEndpoints[chainId]) {
    return explorerApiEndpoints[getDefaultChainId()];
  }
  return explorerApiEndpoints[chainId];
};

export const getColorAccent = (chainId?: number): string => {
  if (!chainId || !chainColorAccents[chainId]) {
    return chainColorAccents[getDefaultChainId()];
  }
  return chainColorAccents[chainId];
};

export const getColorAccentText = (chainId?: number): string => {
  if (!chainId || !chainColorAccentsText[chainId]) {
    return chainColorAccentsText[getDefaultChainId()];
  }
  return chainColorAccentsText[chainId];
};

export const getBetAmounts = (chainId?: number): number[] => {
  if (!chainId || !chainBetAmounts[chainId]) {
    return chainBetAmounts[getDefaultChainId()];
  }
  return chainBetAmounts[chainId];
};

export const getCurrentNetworkState = (chainId?: number): CurrentNetworkStateType => {
  return {
    network: getNetwork(chainId),
    raffleAddress: getRaffleAddress(chainId),
    coinFlipAddress: getCoinFlipAddress(chainId),
    explorerApiEndpoint: getExplorerApiEndpoint(chainId),
    currencySymbol: getNetwork(chainId).nativeCurrency?.symbol || 'ERROR',
    rpcUrl: getNetwork(chainId).rpcUrl || 'ERROR',
    betAmounts: getBetAmounts(chainId),
  };
};
