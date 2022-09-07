/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */

import { Contract } from '@ethersproject/contracts';
import { useContractFunction, useEthers } from '@usedapp/core';
import { BigNumber, utils } from 'ethers';
import raffleArtifacts from 'hardhat/artifacts/contracts/Raffle.sol/Raffle.json';
import { Raffle } from 'hardhat/types';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { contractConfig, currentNetworkChainId } from '@/config';

import { RaffleState, TicketType } from '@/types';

const raffleAbi = new utils.Interface(raffleArtifacts.abi);
const raffleAddress = contractConfig[currentNetworkChainId].raffleAddress;

export function generateTickets(maxTicketCount: number): TicketType[] {
  const tickets: TicketType[] = [];
  for (let i = 0; i < maxTicketCount; i++) {
    tickets.push({
      id: i + 1,
      isSelected: false,
    });
  }
  return tickets;
}

const useRaffle = () => {
  const { account, library, chainId } = useEthers();

  const contract = useMemo(
    () => new Contract(raffleAddress, raffleAbi, library) as Raffle,
    [library]
  );

  const { send } = useContractFunction(contract, 'purchase');

  const [purchasing, setPurchasing] = useState<boolean>(false);
  const [raffleState, setRaffleState] = useState<RaffleState>({
    tickets: [],
    ticketsLeft: [],
    ticketsBought: [],
    ticketPrice: BigNumber.from(0),
    draftTime: new Date(),
  });

  const purchase = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (ticketIds: number[], options: any) => {
      try {
        if (account && options) {
          setPurchasing(true);
          await send(ticketIds, options);
        }
      } catch (e) {
        console.log('Something went wrong', e);
      }
    },
    [account, send]
  );

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
          const contractBalance = await library.getBalance(contract.address);
          const draftTime = (await contract.draftTime()).toString();
          const ticketPrice = (await contract.ticketPrice()).toString();
          const ticketsBought = await contract.getTicketsBought();
          if (code != '0x0') {
            console.log(
              `SmartContract code successfully read. SmartContract balance: ${contractBalance}`
            );
            console.log({ draftTime, ticketPrice, ticketsBought });
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

  const refresh = useCallback(async () => {
    try {
      if (contract && library) {
        await logBlockchainInfo();

        const [maxTicketAmount, ticketPrice, draftTime, ticketsBoughtData] = await Promise.all([
          contract.maxTicketAmount(),
          contract.ticketPrice(),
          contract.draftTime(),
          contract.getTicketsBought(),
        ]);

        const tickets = generateTickets(maxTicketAmount.toNumber());
        const ticketsLeft: TicketType[] = [];
        const ticketsBought: TicketType[] = [];

        // Split tickets left and tickets bought
        tickets.forEach((ticket) => {
          const ticketBought = ticketsBoughtData.filter(
            (item) => item.ticketId.toNumber() === ticket.id
          );
          if (ticketBought.length > 1) {
            throw Error(`Found more than one ticket bought with id: {ticket.id}`);
          }
          if (ticketBought.length > 0) {
            ticket.owner = ticketBought[0].owner;
            ticketsBought.push(ticket);
          } else {
            ticketsLeft.push(ticket);
          }
        });

        setRaffleState({
          ticketPrice,
          draftTime: new Date(draftTime.toNumber() * 1000),
          tickets,
          ticketsLeft,
          ticketsBought,
        });
      } else {
        console.error(`Contract or library undefined`, { contract, library });
      }
    } catch (e) {
      console.error('Something went wrong', e);
    }
  }, [contract, library, logBlockchainInfo]);

  useEffect(() => {
    refresh();
    console.log('refreshed');
  }, [refresh]);

  return {
    purchase,
    purchasing,
    tickets: raffleState.tickets,
    ticketsLeft: raffleState.ticketsLeft,
    ticketPrice: raffleState.ticketPrice,
    draftTime: raffleState.draftTime,
    refresh,
  };
};

export default useRaffle;
