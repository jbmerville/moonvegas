import { Chain, Config, MoonbaseAlpha } from '@usedapp/core';
import coinFlipAddress from 'hardhat/CoinFlip.address.js';
import raffleAddress from 'hardhat/Raffle.address.js';

export const LocalhostChain: Chain = {
  chainId: 1281,
  chainName: 'Moonbeam Localhost',
  isTestChain: true,
  isLocalChain: true,
  multicallAddress: '0x0000000000000000000000000000000000000000',
  getExplorerAddressLink: (address: string) =>
    `https://tutorialchain.etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://tutorialchain.etherscan.io/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: 'http://127.0.0.1:9933',
  blockExplorerUrl: 'https://tutorialchain.etherscan.io',
  nativeCurrency: {
    name: 'GLMR',
    symbol: 'GLMR',
    decimals: 18,
  },
};

export const localhostConfig: Config = {
  networks: [LocalhostChain],
  readOnlyChainId: LocalhostChain.chainId,
  readOnlyUrls: {
    [LocalhostChain.chainId]: 'http://127.0.0.1:9933',
  },
};

export const moonbaseAplhaConfig: Config = {
  networks: [MoonbaseAlpha],
  readOnlyChainId: MoonbaseAlpha.chainId,
  readOnlyUrls: {
    [MoonbaseAlpha.chainId]: 'https://rpc.api.moonbase.moonbeam.network',
  },
};

export const dappConfig = {
  [LocalhostChain.chainId]: localhostConfig,
  [MoonbaseAlpha.chainId]: moonbaseAplhaConfig,
};

export const isMoonbaseAlpha =
  process.env.NEXT_PUBLIC_ENV === 'production' || process.env.NEXT_PUBLIC_ENV === 'pipeline';

export const contractConfig = {
  [LocalhostChain.chainId]: {
    raffleAddress: raffleAddress,
    coinFlipAddress: coinFlipAddress,
  },
  [MoonbaseAlpha.chainId]: {
    raffleAddress: '0x7d3240ef17E7C18ebA590d2b8695eb11cb4A5A4f',
    coinFlipAddress: '0x1D57d3f0602fFE881DBf71D40B60D642222b2967',
  },
};

export const currentNetworkChainId = isMoonbaseAlpha
  ? MoonbaseAlpha.chainId
  : LocalhostChain.chainId;
export const currentNetwork: Chain = isMoonbaseAlpha
  ? {
      ...MoonbaseAlpha,
      nativeCurrency: { decimals: 18, symbol: 'DEV', name: 'DEV' },
      rpcUrl: 'https://rpc.api.moonbase.moonbeam.network',
    }
  : LocalhostChain;
export const currentRaffleAddress = contractConfig[currentNetworkChainId].raffleAddress;
export const currentCoinFlipAddress = contractConfig[currentNetworkChainId].coinFlipAddress;

// To override the currentNetwork, set the NEXT_PUBLIC_ENV variable to "production" in .env
export const currentDappConfig = dappConfig[currentNetworkChainId] as Config;

// eslint-disable-next-line no-console
console.log({
  NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
  currentNetwork: currentNetwork.chainName,
});
