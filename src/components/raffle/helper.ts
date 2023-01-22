import { TicketType } from '@/types';

export const getNonDefaultTicketsSelected = (selectedTickets: TicketType[]): TicketType[] => {
  return selectedTickets.filter((ticket) => ticket.id !== -1);
};
