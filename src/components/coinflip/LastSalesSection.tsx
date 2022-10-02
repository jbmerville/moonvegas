/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { shortenAddress, shortenTransactionHash } from '@usedapp/core';
import { BigNumber, providers, utils } from 'ethers';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { coinFlipAbi } from '@/hooks/useCoinFlip';

import Loading from '@/components/icons/Loading';
import UnderlineLink from '@/components/links/UnderlineLink';

import { currentCoinFlipAddress, currentNetwork } from '@/config';

import coinHeads from '../../../public/images/coin-heads.png';
import coinTails from '../../../public/images/coin-tails.png';

import { CoinFace } from '@/types';

interface TransactionType {
  address: string;
  date: Date;
  price: string;
  choice?: CoinFace;
  isWin: boolean;
  hash: string;
}

const MOONBASE_ALPHA_RPC_API_BASE_URL = 'https://api-moonbase.moonscan.io/api';

const LastSalesSection = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const hasTransactions = transactions.length > 0;

  const parseTxChoice = (tx: any) => {
    try {
      const decodedArgs = coinFlipAbi.decodeFunctionData(tx.input.slice(0, 10), tx.input);
      const functionName = coinFlipAbi.getFunction(tx.input.slice(0, 10)).name;
      if (functionName == 'flip') {
        return decodedArgs[0] === true ? CoinFace.HEADS : CoinFace.TAILS;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const result = await fetch(
        `${MOONBASE_ALPHA_RPC_API_BASE_URL}?module=account&action=txlist&address=${currentCoinFlipAddress}`
      );
      const json = await result.json();
      const provider = new providers.JsonRpcProvider('https://rpc.api.moonbase.moonbeam.network');
      const currentBlock = await provider.getBlockNumber();
      const logs = await provider.getLogs({
        address: currentCoinFlipAddress,
        fromBlock: currentBlock - 50000,
        topics: ['0x3419036def9952f45dbfaa88ccbb2008b3c97cf9fe09f9b8e13e9df7b14b84ae'],
      });

      const eventMap: { [key: string]: boolean } = {};

      logs.forEach((log) => {
        const flipEvent: {
          draw: boolean;
          player: string;
          betAmount: BigNumber;
          playerChoice: boolean;
        } = coinFlipAbi.decodeEventLog('Flip', log.data).round;
        eventMap[log.transactionHash as string] = flipEvent.draw === flipEvent.playerChoice;
      });

      const txHistory = json.result
        .filter((tx: any) => tx.isError === '0' && tx.to !== '') // Remove failed tx and the tx sent to deploy the SC
        .map((tx: any) => {
          return {
            address: tx.from,
            date: new Date(parseInt(tx.timeStamp) * 1000),
            choice: parseTxChoice(tx),
            price: utils.formatEther(BigNumber.from(tx.value)),
            isWin: eventMap[tx.hash] || false,
            hash: tx.hash,
            block: tx.blockNumber,
          } as TransactionType;
        }) as TransactionType[];
      setTransactions(txHistory.sort((a, b) => (a.date > b.date ? -1 : 1)).slice(0, 15));
    };

    fetchHistory();
  }, []);

  return (
    <div className='flex min-w-full grow flex-row justify-between text-white'>
      <div className='layout mt-16 mb-10 flex flex-col items-start justify-between'>
        <div className='mb-1 flex w-full items-center md:mb-3'>
          <p className='mr-2 w-4 text-xs text-moonbeam-cyan md:mr-3 md:w-6'>
            <FontAwesomeIcon icon={faClockRotateLeft} size='xs' />
          </p>
          <p className=' text-center text-xl uppercase text-moonbeam-cyan md:text-xl'>
            Recent Plays
          </p>
        </div>
        <div
          className={`${
            hasTransactions ? 'rounded' : 'rounded-t'
          }  h-full	w-full overflow-hidden border border-moonbeam-cyan`}
        >
          <div className='relative z-10 mb-[-35px] h-10 w-full border-b border-moonbeam-cyan bg-gray-900' />
          <div className='bg-moonbeam-blue-dark md:px-10 md:pb-10 '>
            <table className=' w-full border-spacing-0 text-sm'>
              <thead>
                <tr className='relative z-20 w-full text-moonbeam-cyan'>
                  <th className='hidden md:table-cell md:p-2' scope='col'>
                    Date
                  </th>
                  <th className='hidden md:table-cell md:p-2' scope='col'>
                    Address
                  </th>
                  <th className='md:max-w-100 max-w-[50px] p-1 md:p-2' scope='col'>
                    Result
                  </th>
                  <th className='p-1 md:p-2' scope='col'>
                    Choice
                  </th>
                  <th className='hidden md:table-cell md:p-2' scope='col'>
                    TX
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction, i) => (
                    <tr key={i} className='box-border border-b border-moonbeam-cyan text-center'>
                      <td className='hidden md:table-cell md:p-2'>
                        <p className=''>{transaction.date.toLocaleString()}</p>
                      </td>
                      <td className='hidden md:table-cell md:p-2'>
                        <p className=''>{`${transaction.address.substring(
                          0,
                          8
                        )}...${transaction.address.substring(transaction.address.length - 6)}`}</p>
                      </td>

                      <td className='p-1 md:p-2'>
                        <p className='block text-xs md:hidden'>
                          {shortenAddress(transaction.address)} flipped{' '}
                          <span className='font-bold'>{transaction.price} </span>
                          {currentNetwork.nativeCurrency?.symbol} and{' '}
                          {transaction.isWin ? (
                            <span className=' text-green-400'>doubled</span>
                          ) : (
                            <span className=' text-red-500'>got rugged</span>
                          )}
                          .
                        </p>
                        <p className='hidden md:block'>
                          Flipped {transaction.price} {currentNetwork.nativeCurrency?.symbol} and{' '}
                          {transaction.isWin ? (
                            <span className=' text-green-400'>doubled</span>
                          ) : (
                            <span className=' text-red-500'>got rugged</span>
                          )}
                          .
                        </p>
                      </td>
                      <td className='p-1 md:p-2'>
                        <div className='flex scale-75 items-center justify-center py-2 md:scale-100'>
                          {transaction.choice === CoinFace.HEADS ? (
                            <Image
                              src={coinHeads}
                              layout='fixed'
                              height='40px'
                              width='40px'
                              alt=''
                            />
                          ) : (
                            <Image
                              src={coinTails}
                              layout='fixed'
                              height='40px'
                              width='40px'
                              alt=''
                            />
                          )}
                        </div>
                      </td>
                      <td className='hidden md:table-cell md:p-2'>
                        <UnderlineLink
                          href={currentNetwork.getExplorerTransactionLink(transaction.hash)}
                        >
                          {shortenTransactionHash(transaction.hash)}
                        </UnderlineLink>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className='items-middle flex w-full justify-center'>
                    <td>
                      <Loading />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastSalesSection;
