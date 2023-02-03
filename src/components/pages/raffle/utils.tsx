import { BigNumber, utils } from 'ethers/lib/ethers';

import MoonbeamIcon from '@/components/icons/MoonbeamIcon';
import { CoinFlipTransactionType } from '@/components/pages/coinflip/utils';

import { currentExplorerApi, currentRaffleAddress } from '@/config';
import { MAX_RAFFLE_TICKET_PER_TX, MAX_RAFFLE_TICKET_PER_TX_MOBILE } from '@/constants/env';
import { raffleAbi } from '@/contexts/RaffleContext';

import { ExplorerTransactionType, TicketType } from '@/types';

export interface RaffleTransactionType {
  address: string;
  date: Date;
  price: string;
  ticketsBought: TicketType[];
  hash: string;
}

export const getNonDefaultTicketsSelected = (selectedTickets: TicketType[]): TicketType[] => {
  return selectedTickets.filter((ticket) => ticket.id !== -1);
};

export const renderTxPrice = (value: string) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='scale-[0.9] rounded-full bg-dark p-1 md:scale-[1.5]'>
        <MoonbeamIcon />
      </div>
      <p className='ml-1 md:ml-5'>{value}</p>
    </div>
  );
};

export const getMaxTicketPerTx = (isMobile: boolean) => {
  return isMobile ? MAX_RAFFLE_TICKET_PER_TX_MOBILE : MAX_RAFFLE_TICKET_PER_TX;
};

export async function getRaffleTransactionHistory(): Promise<RaffleTransactionType[]> {
  const result = await fetch(`${currentExplorerApi}?module=account&action=txlist&address=${currentRaffleAddress}`);
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

function sortTransactions(transaction1: CoinFlipTransactionType, transaction2: CoinFlipTransactionType) {
  return transaction1.date > transaction2.date ? -1 : 1;
}

function parseTransactionIput(transaction: ExplorerTransactionType): TicketType[] {
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
      })) as TicketType[];
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return [];
}
