import { BigNumber } from 'ethers';

export interface TicketType {
  id: number;
  owner?: string;
  isSelected: boolean;
}

export interface RaffleState {
  tickets: TicketType[];
  ticketsLeft: TicketType[];
  ticketsBought: TicketType[];
  draftTime: Date;
  ticketPrice: BigNumber;
}
