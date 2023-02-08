import { BigNumber, utils } from 'ethers/lib/ethers';
import Image from 'next/image';
import { ReactNode } from 'react';

import { getNetworkLogo } from '@/lib/helpers';

import { MAX_RAFFLE_TICKET_PER_TX, MAX_RAFFLE_TICKET_PER_TX_MOBILE } from '@/constants/env';
import { raffleAbi } from '@/contexts/RaffleContext';

import moonbeam from '../../../../public/images/moonbeam-token.png';

import { ExplorerTransactionType, RaffleTicketType } from '@/types';

export interface RaffleTransactionType {
  address: string;
  date: Date;
  price: string;
  ticketsBought: RaffleTicketType[];
  hash: string;
}

export const getNonDefaultRaffleSelectedTickets = (selectedRaffleTickets: RaffleTicketType[]): RaffleTicketType[] => {
  return selectedRaffleTickets.filter((ticket) => ticket.id !== -1);
};

export const renderTransactionPrice = (value: string | number, chainId: number) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='scale-[0.9] md:scale-[1.2]'>{getNetworkLogo(chainId)}</div>
      <p className='ml-1 md:ml-2'>{value}</p>
    </div>
  );
};

export const getMaxRaffleTicketPerTransaction = (isMobile: boolean) => {
  return isMobile ? MAX_RAFFLE_TICKET_PER_TX_MOBILE : MAX_RAFFLE_TICKET_PER_TX;
};

export async function getRaffleTransactionHistory(
  explorerApiEndpoint: string,
  raffleAddress: string
): Promise<RaffleTransactionType[]> {
  const result = await fetch(`${explorerApiEndpoint}?module=account&action=txlist&address=${raffleAddress}`);
  const json = await result.json();

  const transactions = json.result as ExplorerTransactionType[];
  if (typeof transactions === 'object' && transactions !== null) {
    return json.result.filter(shouldTransactionBeFiltered).map(parseExplorerTransaction).sort(sortTransactions);
  }
  return [];
}

function parseExplorerTransaction(transaction: ExplorerTransactionType): RaffleTransactionType {
  return {
    address: transaction.from,
    date: new Date(parseInt(transaction.timeStamp) * 1000),
    price: utils.formatEther(BigNumber.from(transaction.value)),
    ticketsBought: parseTransactionIput(transaction),
    hash: transaction.hash,
  };
}

function shouldTransactionBeFiltered(transaction: ExplorerTransactionType): boolean {
  return transaction.isError === '0' && transaction.to !== '';
}

function sortTransactions(transaction1: RaffleTransactionType, transaction2: RaffleTransactionType) {
  return transaction1.date > transaction2.date ? -1 : 1;
}

function parseTransactionIput(transaction: ExplorerTransactionType): RaffleTicketType[] {
  const { input } = transaction;
  try {
    const inputBegining = input.slice(0, 10);
    const decodedArgs = raffleAbi.decodeFunctionData(inputBegining, input);
    const functionName = raffleAbi.getFunction(inputBegining).name;
    if (functionName == 'purchase') {
      return decodedArgs[0].map((ticketId: BigNumber) => ({
        id: ticketId.toNumber(),
        owner: transaction.from,
        isSelected: false,
      })) as RaffleTicketType[];
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error while parsing transaction ${transaction.input}`, error);
  }
  return [];
}

export function renderMiniatureSelectedRaffleTicket(ticket: RaffleTicketType): ReactNode {
  return (
    <div
      key={ticket.id}
      className='mx-2 ml-[-15px] flex h-[50px] w-[40px] flex-col items-center justify-center rounded border bg-moonbeam-grey-dark p-0 shadow-[0_0px_20px_-7px_rgb(0,0,0)]  transition-all'
    >
      <div className='mb-[-10px] mt-[-5px] h-fit text-moonbeam-cyan'>{ticket.id}</div>
      <div className='h-[15px]'>
        <Image src={moonbeam} layout='fixed' height='15px' width='15px' alt='' />
      </div>
    </div>
  );
}
