/* eslint-disable unused-imports/no-unused-vars */
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { shortenAddress, useEthers } from '@usedapp/core';
import { utils } from 'ethers';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';
import MetaMaskIcon from '@/components/icons/MetaMaskIcon';
import BetaBanner from '@/components/layouts/BetaBanner';
import { LinkType } from '@/components/layouts/Layout';

import { currentNetwork, currentNetworkChainId } from '@/config';

import moonvegasLogo from '../../../public/images/moonvegas-logo.png';

const REFERRAL = '1YCYB8B5';

interface HeaderProps {
  isMobileSideBarOpen: boolean;
  toggleMobileSideBar: () => void;
  links: LinkType[];
}

export default function Header(props: HeaderProps) {
  const { isMobileSideBarOpen, toggleMobileSideBar, links } = props;

  const { account, deactivate, activateBrowserWallet, switchNetwork } = useEthers();
  const [isShowCopiedReferral, setIsShowCopiedReferral] = useState(false);

  const connectToNetwork = async () => {
    await activateBrowserWallet();
    await changeNetwork();
  };

  const onReferralClicked = () => {
    setIsShowCopiedReferral(true);
    navigator.clipboard.writeText(REFERRAL);
    setTimeout(() => setIsShowCopiedReferral(false), 1000);
  };

  const changeNetwork = async () => {
    if (window && window.ethereum && window.ethereum.networkVersion !== currentNetworkChainId) {
      try {
        await switchNetwork(currentNetworkChainId);
        toast.dark(`Connected to ${currentNetwork.chainName}`, { type: toast.TYPE.INFO });
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
          toast.dark(`Connected to ${currentNetwork.chainName}`, { type: toast.TYPE.SUCCESS });
        } catch (err) {
          toast.dark(`Error connecting to ${currentNetwork.chainName}`, { type: toast.TYPE.ERROR });
        }
      }
    }
  };

  return (
    <header className='fixed top-0 z-50 w-full bg-moonbeam-grey md:sticky'>
      <div className='layout z-50 flex items-center justify-start py-1 md:py-1'>
        <div className='flex w-full items-center justify-start'>
          <div className='relative my-2 h-[50px] w-[70px] items-center justify-center transition duration-75	md:h-[50px] md:w-[120px]'>
            <Image src={moonvegasLogo} layout='fill' objectFit='contain' alt='' />
          </div>
          {links.map((link) => (
            <Link key={link.url} href={link.url}>
              <a className='ml-6 hidden text-white hover:text-moonbeam-cyan md:block'>{link.name}</a>
            </Link>
          ))}
        </div>
        {account ? (
          <>
            {/* <Button
              variant='dark'
              className='lg-2 relative mr-2 hidden  overflow-hidden md:block'
              onClick={onReferralClicked}
            >
              <p className='z-1 relative'>{REFERRAL}</p>
              <p
                className={`z-2 absolute top-0 left-0 bg-gray-800 p-2 px-8 text-orange transition duration-300 ${
                  isShowCopiedReferral ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Copied!
              </p>
            </Button> */}
            <Button onClick={deactivate}>
              <MetaMaskIcon />
              <p>{shortenAddress(account)}</p>
            </Button>
          </>
        ) : (
          <div className='flex w-fit justify-between '>
            {/* <Button variant='dark' className='lg-2 hidden md:block'>
              <p>Have a referral?</p>
            </Button> */}
            <Button className='w-max' onClick={connectToNetwork}>
              <MetaMaskIcon />
              <p className='text-sm md:text-base'>Connect MetaMask</p>
            </Button>
          </div>
        )}
        <div
          onClick={toggleMobileSideBar}
          className='ml-2 w-fit cursor-pointer items-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-700 md:hidden'
        >
          <FontAwesomeIcon
            icon={faEllipsis}
            size='xs'
            className={`mx-2 w-6 text-xs text-gray-500 md:mx-1 md:w-6 ${
              isMobileSideBarOpen ? 'rotate-0' : 'rotate-90'
            } transition`}
          />
        </div>
      </div>
      <BetaBanner />
    </header>
  );
}
