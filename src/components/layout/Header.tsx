import { shortenAddress, useEthers } from '@usedapp/core';
import { utils } from 'ethers';
import Image from 'next/image';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';
import MetaMaskIcon from '@/components/icons/MetaMaskIcon';

import { currentNetwork, currentNetworkChainId } from '@/config';

import moonvegasLogo from '../../../public/images/moonvegas-logo.gif';

export default function Header() {
  const { account, deactivate, activateBrowserWallet, switchNetwork } = useEthers();

  const connectToNetwork = async () => {
    await activateBrowserWallet();
    await changeNetwork();
  };

  const changeNetwork = async () => {
    if (window && window.ethereum && window.ethereum.networkVersion !== currentNetworkChainId) {
      try {
        await switchNetwork(currentNetworkChainId);
        toast.success(`Connected to ${currentNetwork.chainName}.`);
      } catch (err) {
        // Send request for user to add the network to their MetaMask if not already present
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: currentNetwork.chainName,
                chainId: utils.hexStripZeros(utils.hexlify(currentNetworkChainId)),
                nativeCurrency: currentNetwork.nativeCurrency,
                rpcUrls: [currentNetwork.rpcUrl],
              },
            ],
          });
          toast.success(`Connected to ${currentNetwork.chainName}.`);
        } catch (err) {
          toast.error(`Error connecting to ${currentNetwork.chainName}.`);
        }
      }
    }
  };

  return (
    <header className='navbar-header sticky top-0 z-50 bg-dark'>
      <div className='layout z-50 flex items-center justify-between py-1  md:py-1'>
        <div className='relative hidden h-[70px] w-[160px] items-center justify-center	md:block'>
          <Image src={moonvegasLogo} layout='fill' objectFit='contain' alt='' />
        </div>
        <div className='flex items-center justify-center md:hidden'>
          <div className='relative block h-[70px] w-[70px] items-center justify-center	md:hidden'>
            <Image src={moonvegasLogo} layout='fill' objectFit='contain' alt='' />
          </div>
          <div className='ml-2 flex h-10 items-center  justify-center rounded-full border-2 border-orange bg-orange/20 px-2 text-xs text-orange'>
            Beta
          </div>
        </div>
        {account ? (
          <Button
            variant='outline'
            className='bg-orange/10 text-white hover:bg-moonbeam-cyan/40'
            onClick={deactivate}
          >
            <MetaMaskIcon />
            <p>{shortenAddress(account)}</p>
          </Button>
        ) : (
          <div className='flex w-fit justify-between md:w-[370px]'>
            <Button variant='dark' className='lg-2 hidden md:block'>
              <p>Have a referral?</p>
            </Button>
            <Button
              variant='outline'
              onClick={connectToNetwork}
              className='bg-moonbeam-cyan/20 hover:bg-moonbeam-cyan/40'
            >
              <MetaMaskIcon />
              <p className=' text-sm md:text-base'>Connect MetaMask</p>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
