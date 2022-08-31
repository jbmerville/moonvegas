import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';

import { generateDummyTickets } from '@/pages';

import moonbeam from '../../../public/images/moonbeam-token.png';

import { TicketType } from '@/types';

interface TransactionType {
  address: string;
  date: Date;
  ticketsBought: TicketType[];
  price: number;
  transactionHash: string;
}

function generateDummyTransactions(count: number): TransactionType[] {
  const transactions: TransactionType[] = [];
  for (let i = 0; i < count; i++) {
    const ticketsBought = Math.round(Math.random() * 10);
    transactions.push({
      address: `0x2C1a07a4cCEeeDBbb2f8134867cbDe7cC812652D`,
      date: new Date(Date.now()),
      ticketsBought: generateDummyTickets(Math.round(Math.random() * 10) + 1),
      price: ticketsBought,
      transactionHash: '0x2C1a07a4cCEeeDBbb2f8134867cbDe7cC812652D',
    });
  }
  return transactions;
}

const StatsSections = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const hasTransactions = transactions.length > 0;

  useEffect(() => {
    setTransactions(generateDummyTransactions(10));
  }, []);

  const renderMiniatureSelectedTicket = (ticket: TicketType): ReactNode => {
    return (
      <div className='mx-2 ml-[-20px] flex h-[55px] w-[40px] flex-col rounded border  bg-moonbeam-blue px-4 py-2 shadow-[0_0px_20px_-7px_rgb(0,0,0)]  transition-all'>
        <div className='neonTextPink text rounded-full'>{ticket.id}</div>
        <div className='flex grow items-center justify-center'>
          <div className=''>
            <Image
              src={moonbeam}
              layout='fixed'
              height='15px'
              width='15px'
              alt=''
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className='flex min-w-full grow flex-row justify-between text-white'>
      <div className='layout mt-10 mb-10 flex flex-col items-start justify-between'>
        <p className='text-2xl uppercase text-moonbeam-pink'>
          Last tickets sold
        </p>
        <div
          className={`${
            hasTransactions ? 'rounded' : 'rounded-t'
          } mt-5 h-full	w-full overflow-hidden border border-moonbeam-cyan-light`}
        >
          <table className='h-full w-full	border-spacing-0  text-sm'>
            <thead>
              <tr className='border-b border-moonbeam-cyan-light bg-moonbeam-grey-light text-moonbeam-cyan-light'>
                <th className='p-4' scope='col'>
                  Address
                </th>
                <th className='p-4' scope='col'>
                  Date
                </th>
                <th className='p-4' scope='col'>
                  Tickets Bought
                </th>
                <th className='p-4' scope='col'>
                  Price
                </th>
                <th className='p-4' scope='col'>
                  TX
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.transactionHash}
                  className='box-border border-t border-moonbeam-cyan-light bg-dark'
                >
                  <td className='p-4'>{transaction.address}</td>
                  <td className='p-4'>{transaction.date.toLocaleString()}</td>
                  <td className='p-4'>
                    <div className='flex w-[220px] items-center justify-start overflow-scroll pl-5'>
                      {transaction.ticketsBought.map(
                        renderMiniatureSelectedTicket
                      )}
                    </div>
                  </td>
                  <td className='p-4'>{transaction.price}</td>
                  <td className='p-4'>
                    {`${transaction.transactionHash.substring(
                      0,
                      10
                    )}...${transaction.transactionHash.substring(
                      transaction.transactionHash.length - 10
                    )}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!hasTransactions && (
          <div className='box-border flex  h-full w-full grow items-center justify-center rounded-b border	 border-t-0 border-moonbeam-cyan-light py-5'>
            No transcations for this raffle yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsSections;
