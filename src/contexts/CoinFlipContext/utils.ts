import { utils } from 'ethers/lib/ethers';
import { CoinFlip } from 'hardhat/types';

import { CoinFlipStateType } from '@/types';

/*
 * Get coin flip states from the coin flip smart-contract by querying proxy
 * @param coinFlipContract - The coin flip object derived from smart-contract abi
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getCoinFlipState(coinFlipContract: CoinFlip, library: any): Promise<CoinFlipStateType> {
  const [totalVolumeData, totalFlipsData, contractBalanceData, royaltyData, maxPoolBetRatioData] = await Promise.all([
    coinFlipContract.totalVolume(),
    coinFlipContract.roundId(),
    library.getBalance(coinFlipContract.address),
    coinFlipContract.royalty(),
    coinFlipContract.maxPoolBetRatio(),
  ]);

  const totalVolume = parseFloat(utils.formatEther(totalVolumeData));
  const totalFlips = totalFlipsData.toNumber();
  const contractBalance = parseFloat(utils.formatEther(contractBalanceData));
  const royalty = royaltyData / 10; // Ex: 50  -> 5% royalty
  const maxPoolBetAmount = contractBalance * (maxPoolBetRatioData / 1000); // Ex: 250 -> 25% maxPoolBetRatio, meaning that the max tx amount = 1/4 of total pool.

  return {
    totalVolume,
    totalFlips,
    contractBalance,
    royalty,
    maxPoolBetAmount,
  };
}
