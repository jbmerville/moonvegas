import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    moonbase: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
      chainId: 1287, // 0x507 in hex,
      // accounts: [privateKey],
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
      accounts: [
        '0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133',
      ],
    },
  },
};

export default config;
