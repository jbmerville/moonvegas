import { BigNumber } from 'ethers';

export interface TicketType {
  id: number;
  owner?: string;
  isSelected: boolean;
}

export interface RaffleHistory {
  winner: string;
  winningTicket: number;
  ticketPrice: number;
  totalTickets: number;
}

export interface RaffleState {
  tickets: TicketType[];
  ticketsLeft: TicketType[];
  ticketsBought: TicketType[];
  draftTime: Date;
  ticketPrice: BigNumber;
  raffleHistory: RaffleHistory[];
  maxTicketAmount: number;
}

export interface CoinFlipState {
  totalVolume: number;
  totalFlips: number;
  contractBalance: number;
}

export enum CoinFace {
  HEADS = 'HEADS',
  TAILS = 'TAILS',
}

export enum BetAmount {
  ONE = 1,
  TWO = 2,
  FIVE = 5,
  TEN = 10,
  FIFTEEN = 15,
  TWENTY_FIVE = 25,
  FIFTY = 50,
  ONE_HUNDRED = 100,
}
