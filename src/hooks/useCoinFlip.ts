/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */

import { Contract } from '@ethersproject/contracts';
import { useContractFunction, useEthers } from '@usedapp/core';
import { utils } from 'ethers';
import coinFlipArtifacts from 'hardhat/artifacts/contracts/CoinFlip.sol/CoinFlip.json';
import { CoinFlip } from 'hardhat/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { currentCoinFlipAddress, currentNetworkChainId } from '@/config';

import { BetAmount, CoinFace, CoinFlipState } from '@/types';

export const coinFlipAbi = new utils.Interface(coinFlipArtifacts.abi);

const useCoinFlip = () => {
  const { account, library, chainId } = useEthers();

  const contract = useMemo(
    () => new Contract(currentCoinFlipAddress, coinFlipAbi, library) as CoinFlip,
    [library]
  );

  const { send, state } = useContractFunction(contract, 'flip');

  const [isTransactionPending, setIsTransactionPending] = useState<boolean>(false);
  const [coinFlipState, setCoinFlipState] = useState<CoinFlipState>({
    totalFlips: 0,
    totalVolume: 0,
    contractBalance: 0,
  });

  const [outcome, setOutcome] = useState<{ isWin: boolean; draw: CoinFace } | undefined>();

  const refresh = useCallback(async () => {
    try {
      if (contract && library) {
        // await logBlockchainInfo();

        const [totalFlips, totalVolume, contractBalance] = await Promise.all([
          contract.roundId(),
          contract.totalVolume(),
          library.getBalance(contract.address),
        ]);

        setCoinFlipState({
          totalFlips: totalFlips.toNumber(),
          totalVolume: parseFloat(utils.formatEther(totalVolume)),
          contractBalance: parseFloat(utils.formatEther(contractBalance)),
        });
      } else {
        console.error(`Contract or library undefined`, { contract, library });
      }
    } catch (e) {
      console.error('Something went wrong', e);
    }
  }, [contract, library]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flip = async (choice: CoinFace, betAmount: BetAmount, options?: any) => {
    try {
      if (account && library) {
        setIsTransactionPending(true);
        toast.info('Sending flip transaction');
        const res = (await send(choice === CoinFace.HEADS, {
          value: utils.parseEther('1').mul(BetAmount[betAmount]),
          ...options,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        })) as any;
        if (res?.status == 1) {
          const draw = res.events[0].draw ? CoinFace.HEADS : CoinFace.TAILS;
          setOutcome({
            isWin: draw === choice,
            draw,
          });

          await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1s
          refresh();
          toast.success('Transaction successfull');
        } else {
          toast.error(`Transaction unsuccessful: ${state.errorMessage}`);
        }
        setIsTransactionPending(false);
      } else {
        toast.error('Please login to MetaMask');
        console.error(`Account not found`);
      }
    } catch (e: unknown) {
      toast.error('Something went wrong');
      console.error('Something went wrong', e);
    }
  };

  // Log info about the chain and the smart contract. Fields must be explictly disabled. Defaults to logging all values.
  const logBlockchainInfo = useCallback(
    async (logChain?: boolean, logContract?: boolean) => {
      // Log info about the current chain
      if (logChain === undefined || logChain) {
        if (chainId == currentNetworkChainId) {
          console.log(`Provider on the correct chain: ${currentNetworkChainId}`);
        } else {
          console.error(
            `Provider not on the correct chain. Expected: ${currentNetworkChainId}, actual: ${chainId}`
          );
        }
      }

      // Log info about the current smart contract
      if (logContract === undefined || logContract) {
        if (contract && library) {
          const code = await library.getCode(contract.address);
          const contractBalance = utils.formatEther(await library.getBalance(contract.address));
          const roundId = (await contract.roundId()).toString();
          const totalVolume = utils.formatEther(await contract.totalVolume());
          if (code != '0x0') {
            console.log(`SmartContract code successfully read.`);
            console.log({ roundId, totalVolume, contractBalance });
          } else {
            console.error(`SmartContract code unsuccessfully read, was ${code}`);
          }
        } else {
          console.error('Contract or provider was undefined', contract, library);
        }
      }
    },
    [contract, library, chainId]
  );

  const resetOutcome = () => setOutcome(undefined);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    flip,
    resetOutcome,
    isTransactionPending,
    outcome,
    contractBalance: coinFlipState.contractBalance,
    totalVolume: coinFlipState.totalVolume,
    totalFlips: coinFlipState.totalFlips,
    refresh,
  };
};

export default useCoinFlip;
