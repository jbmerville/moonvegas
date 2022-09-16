/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber, utils } from 'ethers';
import raffleArtifacts from 'hardhat/artifacts/contracts/Raffle.sol/Raffle.json';
import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';

import useRaffle from '@/hooks/useRaffle';

import MoonbeamIcon from '@/components/icons/MoonbeamIcon';
import UnderlineLink from '@/components/links/UnderlineLink';

import { currentNetwork, currentRaffleAddress } from '@/config';

import moonbeam from '../../../public/images/moonbeam-token.png';

import { TicketType } from '@/types';

const raffleAbi = new utils.Interface(raffleArtifacts.abi);

interface TransactionType {
  address: string;
  date: Date;
  ticketsBought: TicketType[];
  price: string;
  hash: string;
  block: string;
}
const MOONBASE_ALPHA_RPC_API_BASE_URL = 'https://api-moonbase.moonscan.io/api';

const LastSalesSection = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const hasTransactions = transactions.length > 0;
  const { tickets } = useRaffle();

  useEffect(() => {
    const fetchHistory = async () => {
      const result = await fetch(
        `${MOONBASE_ALPHA_RPC_API_BASE_URL}?module=account&action=txlist&address=${currentRaffleAddress}`
      );
      const json = await result.json();

      const parseTxInput = (tx: any) => {
        try {
          const decodedArgs = raffleAbi.decodeFunctionData(tx.input.slice(0, 10), tx.input);
          const functionName = raffleAbi.getFunction(tx.input.slice(0, 10)).name;
          if (functionName == 'purchase') {
            return decodedArgs[0].map((ticketId: BigNumber) => ({
              id: ticketId.toNumber(),
              owner: tx.from,
              isSelected: false,
            })) as TicketType[];
          }
          return [];
        } catch (e) {
          return [];
        }
      };

      const txHistory = json.result
        .filter((tx: any) => tx.isError === '0')
        .map((tx: any) => {
          return {
            address: tx.from,
            date: new Date(parseInt(tx.timeStamp) * 1000),
            ticketsBought: parseTxInput(tx),
            price: utils.formatEther(BigNumber.from(tx.value)),
            hash: tx.hash,
            block: tx.blockNumber,
          } as TransactionType;
        }) as TransactionType[];
      setTransactions(txHistory.sort((a, b) => (a.date > b.date ? -1 : 1)));
    };

    fetchHistory();
  }, [tickets]); // Refresh when tickets updates (some tickets have been bought)

  const renderMiniatureSelectedTicket = (ticket: TicketType): ReactNode => {
    return (
      <div
        key={ticket.id}
        className='mx-2 ml-[-15px] flex h-[55px] w-[40px] flex-col items-center justify-center rounded border bg-moonbeam-blue px-2 py-2 shadow-[0_0px_20px_-7px_rgb(0,0,0)]  transition-all'
      >
        <div className='neonTextPink text'>{ticket.id}</div>
        <div className='flex grow items-center justify-center'>
          <div className=''>
            <Image src={moonbeam} layout='fixed' height='15px' width='15px' alt='' />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className='flex min-w-full grow flex-row justify-between text-white'>
      <div className='layout mt-10 mb-10 flex flex-col items-start justify-between'>
        <p className='mb:mb-3 mb-1 text-xl uppercase text-moonbeam-pink md:text-xl'>
          Last tickets sold
        </p>
        <div
          className={`${
            hasTransactions ? 'rounded' : 'rounded-t'
          }  h-full	w-full overflow-hidden border border-moonbeam-cyan`}
        >
          <table className='h-full w-full	border-spacing-0  text-sm'>
            <thead>
              <tr className='border-b border-moonbeam-cyan bg-gray-900 text-moonbeam-cyan'>
                <th className='p-1 md:p-4' scope='col'>
                  Address
                </th>
                <th className='p-1 md:p-4' scope='col'>
                  Date
                </th>
                <th className='p-1 md:p-4' scope='col'>
                  Tickets Bought
                </th>
                <th className='p-1 md:p-4' scope='col'>
                  Price
                </th>
                <th className='p-1 md:p-4' scope='col'>
                  TX
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, i) => (
                <tr
                  key={i}
                  className='box-border border-t border-moonbeam-cyan bg-dark text-center'
                >
                  <td className='p-1 md:p-4'>
                    <p className='hidden md:block'>{transaction.address}</p>
                    <p className='block md:hidden'>{`${transaction.address.substring(
                      0,
                      6
                    )}...${transaction.address.substring(transaction.address.length - 6)}`}</p>
                  </td>
                  <td className='p-1 md:p-4'>
                    <p className='hidden md:block'>{transaction.date.toLocaleString()}</p>
                    <p className='block md:hidden'>{transaction.date.toLocaleDateString()}</p>
                  </td>
                  <td className='p-1 md:p-4'>
                    <div className='hidden md:block'>
                      <div className='flex w-[220px] items-center justify-start overflow-scroll pl-5'>
                        {transaction.ticketsBought.map(renderMiniatureSelectedTicket)}
                      </div>
                    </div>
                    <p className='block md:hidden'>{transaction.ticketsBought.length}</p>
                  </td>
                  <td className='p-1 md:p-4'>
                    <div className='flex items-center justify-center'>
                      <p className='mr-1'>{transaction.price}</p> <MoonbeamIcon />
                    </div>
                  </td>
                  <td className='p-1 md:p-4'>
                    <p className='hidden md:block'>
                      <UnderlineLink
                        href={currentNetwork.getExplorerTransactionLink(transaction.hash)}
                      >
                        {`${transaction.hash.substring(0, 10)}...${transaction.hash.substring(
                          transaction.hash.length - 10
                        )}`}
                      </UnderlineLink>
                    </p>
                    <p className='block md:hidden'>
                      <UnderlineLink
                        href={currentNetwork.getExplorerTransactionLink(transaction.hash)}
                      >
                        {`${transaction.hash.substring(0, 4)}...${transaction.hash.substring(
                          transaction.hash.length - 4
                        )}`}
                      </UnderlineLink>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!hasTransactions && (
          <div className='box-border flex  h-full w-full grow items-center justify-center rounded-b border	 border-t-0 border-moonbeam-cyan py-5'>
            No transcations for this raffle yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default LastSalesSection;
