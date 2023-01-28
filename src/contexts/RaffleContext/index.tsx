/* eslint-disable no-console */

import { Contract } from '@ethersproject/contracts';
import { useContractFunction, useEthers } from '@usedapp/core';
import { BigNumber, utils } from 'ethers';
import raffleArtifacts from 'hardhat/artifacts/contracts/Raffle.sol/Raffle.json';
import { Raffle } from 'hardhat/types';
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { getNonDefaultTicketsSelected } from '@/components/raffle/helper';

import { currentNetwork, currentNetworkChainId, currentRaffleAddress } from '@/config';
import { getRaffleState } from '@/contexts/RaffleContext/utils';

import { RaffleState, TicketType } from '@/types';

export const raffleAbi = new utils.Interface(raffleArtifacts.abi);

export interface RaffleContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  purchase: (tickets: TicketType[], resetTicketsSelected: () => void, options?: any) => Promise<void>;
  isTransactionPending: boolean;
  raffleState: RaffleState;
}

const RaffleContext = createContext<RaffleContextType>({} as RaffleContextType);

/*
 * Context provider that fetches the raffle states from blockchain and facilitates sending raffle tickets purchase transactions
 * @param children - The react children components that consume the RaffleContext
 */
export const RaffleProvider = ({ children }: { children: ReactNode }) => {
  const { account, library, chainId } = useEthers();

  const contract = useMemo(() => new Contract(currentRaffleAddress, raffleAbi, library) as Raffle, [library]);

  const { send, state } = useContractFunction(contract, 'purchase');

  const [isTransactionPending, setIsTransactionPending] = useState<boolean>(false);
  const [raffleState, setRaffleState] = useState<RaffleState>({
    tickets: [],
    ticketsLeft: [],
    ticketsBought: [],
    ticketPrice: BigNumber.from(0),
    draftTime: new Date(),
    raffleHistory: [],
    maxTicketAmount: 0,
  });

  const refreshState = useCallback(async () => {
    try {
      if (!contract) {
        console.error('Raffle contract undefined');
        return;
      }
      const raffleState = await getRaffleState(contract);
      setRaffleState(raffleState);
    } catch (error) {
      console.error('Something went wrong', error);
    }
  }, [contract]);

  useEffect(() => {
    refreshState();
  }, [refreshState]);

  const purchase = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (tickets: TicketType[], resetTicketsSelected: () => void, options?: any) => {
      const ticketIds = getNonDefaultTicketsSelected(tickets).map((ticket) => ticket.id);
      if (ticketIds.length === 0) {
        toast.dark('No ticket selected', { type: toast.TYPE.ERROR });
        return;
      }

      if (chainId !== currentNetworkChainId) {
        toast.dark(`Incorrect chain, connect to ${currentNetwork.chainName} to submit transaction`, {
          type: toast.TYPE.ERROR,
        });
        return;
      }

      if (!account) {
        toast.dark('Please login to MetaMask', { type: toast.TYPE.ERROR });
        console.error(`Account not found`);
        return;
      }

      const price = raffleState.ticketPrice.mul(ticketIds.length);

      try {
        setIsTransactionPending(true);
        toast.dark('Sending purchase transaction', { type: toast.TYPE.INFO });

        const result = await send(ticketIds, { value: price, ...options });

        if (result === undefined) {
          return;
        }
        if (result.status === 1) {
          toast.dark('Successfully purchased tickets', { type: toast.TYPE.SUCCESS });

          // Wait 1s for changes to propagate on blockchain
          await new Promise((resolve) => setTimeout(resolve, 500));
          await refreshState();
          resetTicketsSelected();
          setIsTransactionPending(false);
        } else {
          toast.dark(`Transaction unsuccessful with error: ${state.errorMessage}`, {
            type: toast.TYPE.ERROR,
          });
        }
      } catch (error) {
        toast.dark('Something went wrong', { type: toast.TYPE.ERROR });
        console.error('Something went wrong', error);
        return;
      }
    },
    [account, send, raffleState.ticketPrice, refreshState, chainId, state.errorMessage]
  );

  return (
    <RaffleContext.Provider value={{ purchase, isTransactionPending, raffleState }}>{children}</RaffleContext.Provider>
  );
};

export default RaffleContext;
