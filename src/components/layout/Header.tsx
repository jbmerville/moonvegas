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
        <div className='layout z-50 my-5 flex items-center justify-between py-4 md:h-14 md:py-10'>
          <div className='hidden md:flex'>
            <h2 className='neonTextBlue mr-2 text-3xl'>Moonbeam</h2>
            <h2 className='neonTextPink  mr-4 text-3xl'> Raffle</h2>
            <div className='rounded-full border-2 border-orange bg-orange/20 py-1 px-2 text-orange'>
              Beta
            </div>
          </div>
          <div className='flex md:hidden'>
            <h2 className='neonTextBlue mr-1 text-3xl'>M</h2>
            <h2 className='neonTextPink  mr-4 text-3xl'>R</h2>
            <div className='flex items-center justify-center rounded-full border-2 border-orange bg-orange/20 px-2 text-xs text-orange'>
              Beta
            </div>
          </div>
          {address ? (
            <Button
              variant='outline'
              className='bg-orange/10 text-white hover:bg-moonbeam-cyan/40'
            >
              <MetaMaskIcon />
              <p className='ml-2'>
                {`${address.substring(0, 4)}...${address.substring(
                  address.length - 4
                )}`}
              </p>
            </Button>
          ) : (
            <div className='flex w-fit justify-between md:w-[370px]'>
              <Button variant='dark' className='lg-2 hidden md:block'>
                <p>Have a referral?</p>
              </Button>
              <Button
                variant='outline'
                onClick={connectWithMetamask}
                className='bg-moonbeam-cyan/20 hover:bg-moonbeam-cyan/40'
              >
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
