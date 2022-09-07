import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
import 'solidity-coverage';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@openzeppelin/hardhat-upgrades';

export const isMoonbaseAlpha =
  process.env.NEXT_PUBLIC_ENV === 'production' || process.env.NEXT_PUBLIC_ENV === 'pipeline';

const accounts = [];
if (isMoonbaseAlpha) {
  // TODO: add test account private key to .env to deploy contract in moonbase alpha during deployment
  if (process.env.PRIVATE_KEY) accounts.push(process.env.PRIVATE_KEY);
} else {
  console.log({ NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  accounts.push(require('./secrets.json').privateKey);
}

const config = {
  solidity: '0.8.9',
  networks: {
    moonbase: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
      chainId: 1287, // 0x507 in hex,
      accounts: accounts,
    },
    moonbeam: {
      url: 'https://moonbeam.public.blastapi.io', // Insert your RPC URL here
      chainId: 1284, // (hex: 0x504),
      // accounts: [privateKey],
    },
    moonriver: {
      url: 'https://moonriver.public.blastapi.io', // Insert your RPC URL here
      chainId: 1285, // (hex: 0x505),
      // accounts: [privateKey],
    },
    localhost: {
      url: 'http://127.0.0.1:9933',
      chainId: 1281, // (hex: 0x501),
      accounts: ['0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133'],
    },
  },
  typechain: {
    outDir: './types',
    target: 'ethers-v5',
  },
};

export default config;
