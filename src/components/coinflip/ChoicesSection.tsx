import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import MoonbeamIcon from '@/components/icons/MoonbeamIcon';

enum BetAmount {
  ONE = 1,
  FIVE = 5,
  TEN = 10,
  TWENTY_FIVE = 25,
  FIFTY = 50,
  ONE_HUNDRED = 100,
}

const ChoicesSection = () => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [playerBetAmount, setPlayerBetAmount] = useState<BetAmount | undefined>();

  return (
    <>
      <div className='mb-1 flex w-full items-center md:mb-3'>
        <p className='mr-2 w-5 text-xs text-moonbeam-cyan md:mr-3 md:w-7'>
          <FontAwesomeIcon icon={faWandMagicSparkles} size='xs' />
        </p>
        <p className=' text-center text-xl uppercase text-moonbeam-cyan md:text-xl'>Choices</p>
      </div>
      <div className='w-full rounded border border-moonbeam-cyan bg-moonbeam-blue-dark p-2 md:p-5'>
        <div className='grid grid-cols-3 grid-rows-2 gap-2.5	'>
          {Object.entries(BetAmount)
            .filter((v) => !isNaN(Number(v[0])))
            .map((entry) => (
              <button
                key={entry[0]}
                onClick={() => setPlayerBetAmount(entry[1] as BetAmount)}
                className=' group relative inline-flex  items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-white hover:text-white focus:from-purple-600 focus:to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
              >
                <span className='text relative inline-flex w-full items-center justify-center rounded bg-dark px-1 py-2.5 pl-5 uppercase transition-all duration-75 ease-in group-hover:bg-opacity-0 group-focus:bg-opacity-0	dark:bg-gray-900 md:px-5 md:font-extrabold'>
                  {entry[0]}
                  <div className='ml-2 text-lg'>
                    <MoonbeamIcon />
                  </div>
                </span>
              </button>
            ))}
        </div>
        <button
          key='button'
          className=' group  relative mt-8 mr-2 inline-flex w-full  items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-white hover:text-white focus:from-purple-600 focus:to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
        >
          <span className='relative w-full rounded bg-dark px-5 py-2.5 text-lg font-extrabold uppercase transition-all duration-75 ease-in	group-hover:bg-opacity-0 group-focus:bg-opacity-0 dark:bg-gray-900'>
            Double or nothing
          </span>
        </button>
      </div>
    </>
  );
};

export default ChoicesSection;