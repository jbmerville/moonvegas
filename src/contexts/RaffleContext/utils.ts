import { utils } from 'ethers/lib/ethers';
import { Raffle } from 'hardhat/types';

import { RaffleHistory, RaffleState, TicketType } from '@/types';

/*
 * Parse raffle history data received from smart-contract
 * @param raffleHistory - The data object received from proxy call to smart-contract
 */
function parseRaffleHistory(raffleHistory: Raffle.RaffleHistoryStructOutput[]): RaffleHistory[] {
  return raffleHistory
    .slice(0)
    .reverse()
    .map((history) => ({
      winner: history.winner,
      winningTicket: history.winningTicket.toNumber(),
      ticketPrice: parseFloat(utils.formatEther(history.ticketPrice)),
      totalTickets: history.totalTickets.toNumber(),
    }));
}

/*
 * Parse ticket data received from smart-contract into tickets bought by players and tickets available
 * @param ticketsBoughtData - The data object received from proxy call to smart-contract
 * @param maxTicketAmount - The maximum amount of tickets in the current raffle
 */
function parseTicketsBoughtData(
  ticketsBoughtData: Raffle.TicketBoughtStructOutput[],
  maxTicketAmount: number
): { tickets: TicketType[]; ticketsBought: TicketType[]; ticketsLeft: TicketType[] } {
  const tickets: TicketType[] = Array(maxTicketAmount)
    .fill({ id: -1, isSelected: false })
    .map((item, index) => ({ ...item, id: index + 1 }));
  const ticketsLeft: TicketType[] = [];
  const ticketsBought: TicketType[] = [];

  const ticketsBoughtMap = new Map(ticketsBoughtData.map((ticket) => [ticket.ticketId.toNumber(), ticket.owner]));

  // Split tickets left and tickets bought
  tickets.forEach((ticket) => {
    if (ticketsBoughtMap.has(ticket.id)) {
      ticket.owner = ticketsBoughtMap.get(ticket.id);
      ticketsBought.push(ticket);
    } else {
      ticketsLeft.push(ticket);
    }
  });

  return { tickets, ticketsBought, ticketsLeft };
}

/*
 * Get raffle states from the raffle smart-contract by querying proxy
 * @param raffleContract - The raffle object derived from smart-contract abi
 */
export async function getRaffleState(raffleContract: Raffle): Promise<RaffleState> {
  const [maxTicketAmountData, ticketPrice, draftTimeData, ticketsBoughtData, raffleHistoryData] = await Promise.all([
    raffleContract.maxTicketAmount(),
    raffleContract.ticketPrice(),
    raffleContract.draftTime(),
    raffleContract.getTicketsBought(),
    raffleContract.getRaffleHistory(),
  ]);

  const maxTicketAmount = maxTicketAmountData.toNumber();
  const draftTime = new Date(draftTimeData.toNumber() * 1000);
  const { tickets, ticketsBought, ticketsLeft } = parseTicketsBoughtData(ticketsBoughtData, maxTicketAmount);
  const raffleHistory = parseRaffleHistory(raffleHistoryData);

  return {
    maxTicketAmount,
    ticketPrice,
    draftTime,
    tickets,
    ticketsBought,
    ticketsLeft,
    raffleHistory,
  };
}
