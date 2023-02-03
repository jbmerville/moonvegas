import { MoonbaseAlpha, Moonbeam, Moonriver } from '@usedapp/core';
import fs from 'fs';
import { task } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
import 'solidity-coverage';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@openzeppelin/hardhat-upgrades';

const localhostChainId = 1281;

export const getCurrentNetworkChainId = () => {
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    return Moonbeam.chainId;
  }
  if (process.env.NEXT_PUBLIC_ENV === 'development') {
    return MoonbaseAlpha.chainId;
  }
  return localhostChainId;
};

const accounts = [];
console.log({ NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV });

if (getCurrentNetworkChainId() !== localhostChainId) {
  // TODO: add test account private key to .env to deploy contract in moonbase alpha during deployment
  if (process.env.PRIVATE_KEY) accounts.push(process.env.PRIVATE_KEY);
} else {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  accounts.push(require('./secrets.json').privateKey);
}

const config = {
  solidity: '0.8.9',
  networks: {
    moonbase: {
      url: MoonbaseAlpha.rpcUrl,
      chainId: MoonbaseAlpha.chainId, // 1287, (hex: 0x507),
      accounts: accounts,
    },
    moonbeam: {
      url: Moonbeam.rpcUrl,
      chainId: Moonbeam.chainId, // 1284 (hex: 0x504),
      accounts: accounts,
    },
    moonriver: {
      url: Moonriver.rpcUrl,
      chainId: Moonriver.chainId, // 1285 (hex: 0x505),
      accounts: accounts,
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

task('deploy', 'Deploy the smart contracts to a network')
  .addParam('networkname', 'The network name, used to store the smartcontract addresses under the /sc-address dir')
  .addParam('deployraffle', 'Whether to deploy the raffle smartcontract or not', 'false')
  .addParam('deploycoinflip', 'Whether to deploy the coin flip smartcontract or not')
  .addParam('raffleticketprice', 'The price of each raffle tickets')
  .addParam('coinflippoolamount', 'The amount of tokens to add to the coin flip pool')
  .setAction(async ({ networkname, deployraffle, deploycoinflip, raffleticketprice, coinflippoolamount }, hre) => {
    console.log({ networkname, deployraffle, deploycoinflip, raffleticketprice, coinflippoolamount });
    if (deployraffle === 'true') {
      const currentTimestampInSeconds = Math.round(Date.now() / 1000);
      const ONE_DAY_IN_SECS = 24 * 60 * 60;
      const ONE_WEEK_IN_SECS = 7 * ONE_DAY_IN_SECS;

      const draftTime = currentTimestampInSeconds + ONE_WEEK_IN_SECS;
      const maxTicketAmount = 6;

      const Raffle = await hre.ethers.getContractFactory('Raffle');
      const raffle = await Raffle.deploy(draftTime, maxTicketAmount, hre.ethers.utils.parseEther(raffleticketprice));

      await raffle.deployed();

      // await raffle.purchase([1, 3], { value: hre.ethers.utils.parseEther(ticketPrice).mul(2) });

      writeContractAddress(networkname, 'Raffle', raffle.address);
    }
    if (deploycoinflip === 'true') {
      const CoinFlip = await hre.ethers.getContractFactory('CoinFlip');
      const coinFlip = await CoinFlip.deploy();

      await coinFlip.deployed();

      await coinFlip.loadFunds({ value: hre.ethers.utils.parseEther(coinflippoolamount) });

      writeContractAddress(networkname, 'CoinFlip', coinFlip.address);
    }
  });

function writeContractAddress(networkName: string, contractName: string, contractAddress: string) {
  fs.writeFileSync(`sc-addresses/${networkName}/${contractName}.address.js`, `module.exports = '${contractAddress}';`);
  console.log(`${contractName} deployed to ${contractAddress}`);
}

export default config;
