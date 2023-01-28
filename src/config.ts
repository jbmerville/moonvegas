import { Chain, Config, MoonbaseAlpha } from '@usedapp/core';
import coinFlipAddressLocalhost from 'hardhat/sc-addresses/localhost/CoinFlip.address.js';
import raffleAddressLocalhost from 'hardhat/sc-addresses/localhost/Raffle.address.js';
import coinFlipAddressMoonbaseAlpha from 'hardhat/sc-addresses/moonbase-alpha/CoinFlip.address.js';
import raffleAddresssMoonbaseAlpha from 'hardhat/sc-addresses/moonbase-alpha/Raffle.address.js';

export const LocalhostChain: Chain = {
  chainId: 1281,
  chainName: 'Moonbeam Localhost',
  isTestChain: true,
  isLocalChain: true,
  multicallAddress: '0x0000000000000000000000000000000000000000',
  getExplorerAddressLink: (address: string) => `https://tutorialchain.etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://tutorialchain.etherscan.io/tx/${transactionHash}`,
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
    raffleAddress: raffleAddressLocalhost,
    coinFlipAddress: coinFlipAddressLocalhost,
  },
  [MoonbaseAlpha.chainId]: {
    raffleAddress: raffleAddresssMoonbaseAlpha,
    coinFlipAddress: coinFlipAddressMoonbaseAlpha,
  },
};

export const currentNetworkChainId = isMoonbaseAlpha ? MoonbaseAlpha.chainId : LocalhostChain.chainId;
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
