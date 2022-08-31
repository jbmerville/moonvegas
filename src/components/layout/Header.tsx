import { useAddress, useMetamask } from '@thirdweb-dev/react';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import MetaMaskIcon from '@/components/icons/MetaMaskIcon';

export default function Header() {
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  return (
    <>
      <header className='sticky top-0 z-50 bg-dark '>
        <div className='layout z-50 my-5 flex h-14 items-center justify-between py-10'>
          <div className='flex'>
            <h2 className='neonTextBlue mr-2 text-3xl'>Moonbeam</h2>
            <h2 className='neonTextPink text-3xl'> Raffle</h2>
          </div>
          {address ? (
            <Button
              variant='outline'
              className='text-white hover:text-moonbeam-blue'
            >
              <MetaMaskIcon />
              <p className='ml-2'>
                {`${address.substring(0, 4)}...${address.substring(
                  address.length - 4
                )}`}
              </p>
            </Button>
          ) : (
            <div className='flex w-[370px] justify-between'>
              <Button variant='dark'>
                <p className='ml-2'>Have a referral?</p>
              </Button>
              <Button variant='outline' onClick={connectWithMetamask}>
                <MetaMaskIcon />
                <p className='ml-2 '>Connect MetaMask</p>
              </Button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
