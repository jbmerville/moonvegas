/* eslint-disable @typescript-eslint/no-explicit-any */
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { shortenAddress, shortenTransactionHash } from '@usedapp/core';
import { BigNumber, utils } from 'ethers';
import Image from 'next/image';
import React, { ReactNode, useEffect, useState } from 'react';

import useRaffle, { raffleAbi } from '@/hooks/useRaffle';

import MoonbeamIcon from '@/components/icons/MoonbeamIcon';
import UnderlineLink from '@/components/links/UnderlineLink';

import { currentNetwork, currentRaffleAddress } from '@/config';

import moonbeam from '../../../../public/images/moonbeam-token.png';

import { TicketType } from '@/types';

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

  useEffect(() => {
    const fetchHistory = async () => {
      const result = await fetch(
        `${MOONBASE_ALPHA_RPC_API_BASE_URL}?module=account&action=txlist&address=${currentRaffleAddress}`
      );
      const json = await result.json();

      const txHistory = json.result
        .filter((tx: any) => tx.isError === '0' && tx.to !== '') // Remove failed tx and the tx sent to deploy the SC
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
      <div className='layout mt-16 mb-10 flex flex-col items-start justify-between'>
        <div className='mb-1 flex w-full items-center md:mb-3'>
          <div className='mr-2 w-4 text-xs text-moonbeam-cyan md:mr-3 md:w-6'>
            <FontAwesomeIcon icon={faClockRotateLeft} size='xs' />
          </div>
          <p className=' text-center text-lg uppercase text-moonbeam-cyan md:text-xl'>
            Last tickets sold
          </p>
        </div>
        <div
          className={`${
            hasTransactions ? 'rounded-lg' : 'rounded-t'
          }  h-full	w-full overflow-hidden border border-moonbeam-cyan`}
        >
          <div className='border-b border-moonbeam-cyan bg-gray-900 md:px-10'>
            <table className='w-full	border-spacing-0  text-sm'>
              <thead>
                <tr className=' text-moonbeam-cyan'>
                  <th className='p-1 md:p-2' scope='col'>
                    Address
                  </th>
                  <th className='p-1 md:p-2' scope='col'>
                    Date
                  </th>
                  <th className='md:max-w-100 max-w-[50px] p-1 md:p-2' scope='col'>
                    Tickets Bought
                  </th>
                  <th className='p-1 md:p-2' scope='col'>
                    Price
                  </th>
                  <th className='p-1 md:p-2' scope='col'>
                    TX
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className='md:px-10 md:pb-10'>
            <table className='h-full w-full	border-spacing-0 bg-moonbeam-blue-dark text-sm'>
              <tbody>
                {transactions.map((transaction, i) => (
                  <tr
                    key={i}
                    className='box-border border-b border-moonbeam-cyan bg-dark text-center'
                  >
                    <td className='p-1 md:p-2'>
                      <p className='hidden md:block'>{`${transaction.address.substring(
                        0,
                        8
                      )}...${transaction.address.substring(transaction.address.length - 6)}`}</p>
                      <p className='block md:hidden'>{shortenAddress(transaction.address)}</p>
                    </td>
                    <td className='p-1 md:p-2'>
                      <p className='hidden md:block'>{transaction.date.toLocaleString()}</p>
                      <p className='block md:hidden'>{transaction.date.toLocaleDateString()}</p>
                    </td>
                    <td className='p-1 md:p-2'>
                      <div className='hidden md:block'>
                        <div className='flex w-[220px] items-center justify-start overflow-x-scroll pl-5'>
                          {transaction.ticketsBought.map(renderMiniatureSelectedTicket)}
                        </div>
                      </div>
                      <p className='block md:hidden'>{transaction.ticketsBought.length}</p>
                    </td>
                    <td className='p-1 md:p-2'>
                      <div className='flex items-center justify-center'>
                        <p className='mr-1'>{transaction.price}</p> <MoonbeamIcon />
                      </div>
                    </td>
                    <td className='p-1 md:p-2'>
                      <p className='block'>
                        <UnderlineLink
                          href={currentNetwork.getExplorerTransactionLink(transaction.hash)}
                        >
                          {shortenTransactionHash(transaction.hash)}
                        </UnderlineLink>
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
