import { BigNumber } from 'ethers';

export interface TicketType {
  id: number;
  owner?: string;
  isSelected: boolean;
}

export interface RaffleHistoryType {
  winner: string;
  winningTicket: number;
  ticketPrice: number;
  totalTickets: number;
}

export interface RaffleStateType {
  tickets: TicketType[];
  ticketsLeft: TicketType[];
  ticketsBought: TicketType[];
  draftTime: Date;
  ticketPrice: BigNumber;
  raffleHistory: RaffleHistoryType[];
  maxTicketAmount: number;
  royalty: number;
}

export interface CoinFlipStateType {
  totalVolume: number;
  totalFlips: number;
  contractBalance: number;
  royalty: number;
  maxPoolBetAmount: number;
}

export enum CoinFace {
  HEADS = 'HEADS',
  TAILS = 'TAILS',
}

export interface BetAmount {
  name: string;
  value: number;
}
export const BetAmounts: BetAmount[] = [
  { name: 'One', value: 1 },
  { name: 'Two', value: 2 },
  { name: 'Five', value: 5 },
  { name: 'Ten', value: 10 },
  { name: 'Fifteen', value: 15 },
  { name: 'Tweenty', value: 20 },
  { name: 'Thirty', value: 30 },
  { name: 'One Hundred', value: 100 },
];
