import { useAddress, useMetamask } from '@thirdweb-dev/react';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import MetaMaskIcon from '@/components/icons/MetaMaskIcon';

export default function Header() {
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  return (
    <header className='sticky top-0 z-50'>
      <div className='layout mt-10 mb-10 flex h-14 items-center justify-between'>
        <div className='flex'>
          <h2 className='neonTextBlue mr-2 text-4xl'>Moonbeam</h2>
          <h2 className='neonTextPink text-4xl'> Raffle</h2>
        </div>
        {address ? (
          <Button
            variant='outline'
            className='text-white hover:text-moonbeam-blue'
          >
            <MetaMaskIcon />

            <p className='ml-2 '>
              {`${address.substring(0, 4)}...${address.substring(
                address.length - 4
              )}`}
            </p>
          </Button>
        ) : (
          <Button variant='outline' onClick={connectWithMetamask}>
            <p>Connect to Metamask</p>
          </Button>
        )}
      </div>
    </header>
  );
}
