/* eslint-disable no-console */

import { Contract } from '@ethersproject/contracts';
import { TransactionState, useContractFunction, useEthers } from '@usedapp/core';
import { ethers, utils } from 'ethers';
import coinFlipArtifacts from 'hardhat/artifacts/contracts/CoinFlip.sol/CoinFlip.json';
import { CoinFlip } from 'hardhat/types';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { toastOnStatusChange, wait } from '@/lib/helpers';

import { convertLogToFlipEvent, FlipEventType, getCoinFlipState } from '@/contexts/CoinFlipContext/utils';
import { useCurrentNetworkContext } from '@/contexts/CurrentNetwork';

import { CoinFace, CoinFlipStateType } from '@/types';

export const coinFlipAbi = new utils.Interface(coinFlipArtifacts.abi);

export interface CoinFlipContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flip: (betAmount: number, choice?: CoinFace, options?: any) => Promise<void>;
  isTransactionPending: boolean;
  transactionStatus: TransactionState;
  coinFlipState: CoinFlipStateType;
  isCoinFlipStateFetching: boolean;
  lastCoinFlipResult?: FlipEventType;
}

const CoinFlipContext = createContext<CoinFlipContextType>({} as CoinFlipContextType);

/*
 * Context provider that fetches the coin flip states from blockchain and facilitates sending flip transactions
 * @param children - The react children components that consume the CoinFlipContext
 */
export const CoinFlipProvider = ({ children }: { children: ReactNode }) => {
  const { account, library } = useEthers();
  const { currentNetwork } = useCurrentNetworkContext();

  const contract = useMemo(
    () => new Contract(currentNetwork.coinFlipAddress, coinFlipAbi, library) as CoinFlip,
    [library, currentNetwork.coinFlipAddress]
  );

  const { send, state } = useContractFunction(contract, 'flip');
  const transactionStatus = state.status;
  const [isTransactionPending, setIsTransactionPending] = useState<boolean>(false);
  const [isCoinFlipStateFetching, setIsCoinFlipStateFetching] = useState<boolean>(false);
  const [lastCoinFlipResult, setLastCoinFlipResult] = useState<FlipEventType | undefined>();

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
      setIsCoinFlipStateFetching(true);
      const coinFlipState = await getCoinFlipState(contract, library);
      setCoinFlipState(coinFlipState);
      setIsCoinFlipStateFetching(false);
    } catch (error) {
      console.error('Something went wrong', error);
    }
  }, [contract, library]);

  useEffect(() => {
    refreshState();
  }, [refreshState]);

  useEffect(() => {
    toastOnStatusChange(state);
  }, [state.status, state.errorMessage]);

  const flip = useCallback(
    async (betAmount: number, choice?: CoinFace) => {
      if (choice === undefined) {
        toast.dark('No coin face selected. Select either heads or tails', { type: toast.TYPE.ERROR });
        return;
      }

      if (!account) {
        toast.dark('Please login to MetaMask', { type: toast.TYPE.ERROR });
        return;
      }

      const price = ethers.utils.parseEther(betAmount.toString());
      const playerChoice = choice === CoinFace.HEADS;

      try {
        setIsTransactionPending(true);

        const result = await send(playerChoice, { value: price });
        if (result === undefined) {
          return;
        }

        if (result.logs.length > 0) {
          const flipEvent = convertLogToFlipEvent(result.logs[0]);
          setLastCoinFlipResult(flipEvent);
        } else {
          toast.dark('Error reading transaction result', { type: toast.TYPE.ERROR });
        }

        // Wait 1s for changes to propagate to the blockchain
        await wait(1_000);
        await refreshState();
      } catch (error) {
        toast.dark('Something went wrong', { type: toast.TYPE.ERROR });
        console.error('Something went wrong', error);
        return;
      } finally {
        setIsTransactionPending(false);
      }
    },
    [account, send, refreshState]
  );

  return (
    <CoinFlipContext.Provider
      value={{
        flip,
        isTransactionPending,
        coinFlipState,
        transactionStatus,
        isCoinFlipStateFetching,
        lastCoinFlipResult,
      }}
    >
      {children}
    </CoinFlipContext.Provider>
  );
};

export const useCoinFlipContext = () => useContext(CoinFlipContext);

export default CoinFlipContext;
