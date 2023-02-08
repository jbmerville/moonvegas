import { Chain } from '@usedapp/core';

import { chainColorAccents, chains, contractAddresses, explorerApiEndpoints, getDefaultChainId } from '@/config';

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
