/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { shortenAddress, shortenTransactionHash } from '@usedapp/core';
import { utils } from 'ethers';
import raffleArtifacts from 'hardhat/artifacts/contracts/Raffle.sol/Raffle.json';
import Image from 'next/image';
import React, { useState } from 'react';

import { CoinFace } from '@/components/coinflip/CoinSection';
import UnderlineLink from '@/components/links/UnderlineLink';

import { currentNetwork } from '@/config';

import coin from '../../../public/images/coin.png';

const raffleAbi = new utils.Interface(raffleArtifacts.abi);

interface TransactionType {
  address: string;
  date: Date;
  amount: number;
  choice: CoinFace;
  isWin: boolean;
  hash: string;
}
const MOONBASE_ALPHA_RPC_API_BASE_URL = 'https://api-moonbase.moonscan.io/api';

const LastSalesSection = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([
    {
      address: '0xaa71b125c07487a818b3098b992ff27ac546ca67',
      date: new Date(),
      amount: 5,
      choice: CoinFace.HEADS,
      isWin: false,
      hash: '0xe8b61d837f2f7e4e5555bfcab8f69bd919a26a1efb14c13a144f22cf863a221c',
    },
    {
      address: '0xaa71b125c07487a818b3098b992ff27ac546ca67',
      date: new Date(),
      amount: 10,
      choice: CoinFace.HEADS,
      isWin: true,
      hash: '0xe8b61d837f2f7e4e5555bfcab8f69bd919a26a1efb14c13a144f22cf863a221c',
    },
  ]);
  const hasTransactions = transactions.length > 0;

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
            <table className='h-full w-full	border-spacing-0 text-sm'>
              <thead>
                <tr className='relative z-20 w-full text-moonbeam-cyan'>
                  <th className='p-1 md:p-2' scope='col'>
                    Date
                  </th>
                  <th className='p-1 md:p-2' scope='col'>
                    Address
                  </th>
                  <th className='md:max-w-100 max-w-[50px] p-1 md:p-2' scope='col'>
                    Result
                  </th>
                  <th className='p-1 md:p-2' scope='col'>
                    Choice
                  </th>
                  <th className='p-1 md:p-2' scope='col'>
                    TX
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, i) => (
                  <tr key={i} className='box-border border-b border-moonbeam-cyan text-center'>
                    <td className='p-1 md:p-2'>
                      <p className='hidden md:block'>{transaction.date.toLocaleString()}</p>
                      <p className='block md:hidden'>{transaction.date.toLocaleDateString()}</p>
                    </td>
                    <td className='p-1 md:p-2'>
                      <p className='hidden md:block'>{`${transaction.address.substring(
                        0,
                        8
                      )}...${transaction.address.substring(transaction.address.length - 6)}`}</p>
                      <p className='block md:hidden'>{shortenAddress(transaction.address)}</p>
                    </td>

                    <td className='p-1 md:p-2'>
                      <div className='block'>
                        <p className='inline-block'>
                          Flipped {transaction.amount} {currentNetwork.nativeCurrency?.symbol} and{' '}
                          {transaction.isWin ? (
                            <span className='px-1 text-green-400'>doubled</span>
                          ) : (
                            <span className='px-1 text-red-500'>got rugged</span>
                          )}
                          .
                        </p>
                      </div>
                    </td>
                    <td className='p-1 md:p-2'>
                      <div className='flex items-center justify-center'>
                        {transaction.choice === CoinFace.HEADS ? (
                          <Image src={coin} layout='fixed' height='20px' width='20px' alt='' />
                        ) : (
                          <Image src={coin} layout='fixed' height='20px' width='20px' alt='' />
                        )}
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
      </div>
    </div>
  );
};

export default LastSalesSection;
