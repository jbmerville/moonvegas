/* eslint-disable no-console */

import { Contract } from '@ethersproject/contracts';
import { useContractFunction, useEthers } from '@usedapp/core';
import { utils } from 'ethers';
import coinFlipArtifacts from 'hardhat/artifacts/contracts/CoinFlip.sol/CoinFlip.json';
import { CoinFlip } from 'hardhat/types';
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { currentCoinFlipAddress, currentNetwork, currentNetworkChainId } from '@/config';
import { getCoinFlipState } from '@/contexts/CoinFlipContext/utils';

import { BetAmount, CoinFace, CoinFlipStateType } from '@/types';

export const coinFlipAbi = new utils.Interface(coinFlipArtifacts.abi);

export interface CoinFlipContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flip: (choice?: CoinFace, betAmount?: BetAmount, options?: any) => Promise<void>;
  isTransactionPending: boolean;
  transactionStatus: string;
  coinFlipState: CoinFlipStateType;
}

const CoinFlipContext = createContext<CoinFlipContextType>({} as CoinFlipContextType);

/*
 * Context provider that fetches the coin flip states from blockchain and facilitates sending flip transactions
 * @param children - The react children components that consume the CoinFlipContext
 */
export const CoinFlipProvider = ({ children }: { children: ReactNode }) => {
  const { account, library, chainId } = useEthers();

  const contract = useMemo(() => new Contract(currentCoinFlipAddress, coinFlipAbi, library) as CoinFlip, [library]);

  const { send, state } = useContractFunction(contract, 'flip');
  const transactionStatus = state.status;
  const [isTransactionPending, setIsTransactionPending] = useState<boolean>(false);
  const [coinFlipState, setCoinFlipState] = useState<CoinFlipStateType>({
    totalFlips: 0,
    totalVolume: 0,
    contractBalance: 0,
    royalty: 0,
    maxPoolBetAmount: 0,
  });

  const refreshState = useCallback(async () => {
    try {
      if (!contract) {
        console.error('CoinFlip contract undefined');
        return;
      }
      if (!library) {
        console.error('CoinFlip library undefined');
        return;
      }
      const coinFlipState = await getCoinFlipState(contract, library);
      setCoinFlipState(coinFlipState);
    } catch (error) {
      console.error('Something went wrong', error);
    }
  }, [contract, library]);

  useEffect(() => {
    refreshState();
  }, [refreshState]);

  useEffect(() => {
    if (state.status === 'Mining') {
      toast.dark('Transaction sent', { type: toast.TYPE.INFO });
    } else if (state.status === 'PendingSignature') {
      toast.dark('Please confirm transaction on Metamask', { type: toast.TYPE.INFO });
    } else if (state.status === 'Success') {
      toast.dark('Successfully flipped coin', { type: toast.TYPE.SUCCESS });
    } else if (state.status === 'Fail') {
      toast.dark(`Transaction failed with error: ${state.errorMessage}`, {
        type: toast.TYPE.ERROR,
      });
    } else if (state.status === 'Exception') {
      toast.dark(`Transaction failed with exception: ${state.errorMessage}`, {
        type: toast.TYPE.ERROR,
      });
    }
  }, [state.status, state.errorMessage]);

  const flip = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (choice?: CoinFace, betAmount?: BetAmount, options?: any) => {
      if (choice === undefined) {
        toast.dark('No coin face selected. Select either heads or tails.', { type: toast.TYPE.ERROR });
        return;
      }

      if (betAmount === undefined) {
        toast.dark('No bet amount selected.', { type: toast.TYPE.ERROR });
        return;
      }

      if (chainId !== currentNetworkChainId) {
        toast.dark(`Incorrect chain, connect to ${currentNetwork.chainName} to flip coin.`, {
          type: toast.TYPE.ERROR,
        });
        return;
      }

      if (!account) {
        toast.dark('Please login to MetaMask', { type: toast.TYPE.ERROR });
        console.error(`Account not found`);
        return;
      }

      const price = utils.parseEther('1').mul(betAmount.value);
      const playerChoice = choice === CoinFace.HEADS;

      try {
        setIsTransactionPending(true);

        const result = await send(playerChoice, { value: price, ...options });

        if (result === undefined) {
          return;
        }
        if (result.status === 1) {
          // Wait 1s for changes to propagate to the blockchain
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await refreshState();
          setIsTransactionPending(false);
        }
      } catch (error) {
        toast.dark('Something went wrong', { type: toast.TYPE.ERROR });
        console.error('Something went wrong', error);
        return;
      }
    },
    [account, send, refreshState, chainId]
  );

  return (
    <CoinFlipContext.Provider value={{ flip, isTransactionPending, coinFlipState, transactionStatus }}>
      {children}
    </CoinFlipContext.Provider>
  );
};

export default CoinFlipContext;
