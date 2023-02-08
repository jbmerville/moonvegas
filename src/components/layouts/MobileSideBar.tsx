import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

import HeaderNetworkSelect from '@/components/layouts/Header/HeaderNetworkSelect';
import { LinkType } from '@/components/layouts/Layout';

interface MobileSideBarProps {
  isMobileSideBarOpen: boolean;
  toggleMobileSideBar: () => void;
  links: LinkType[];
}
const MobileSideBar = (props: MobileSideBarProps) => {
  const { isMobileSideBarOpen, toggleMobileSideBar, links } = props;

  return (
    <nav
      className={`fixed right-0 block h-full overflow-hidden ${
        isMobileSideBarOpen ? 'w-11/12' : 'w-[0px]'
      } z-50  transition-width duration-100`}
    >
      <div className='item-center flex h-full w-full flex-col justify-between overflow-y-auto bg-moonbeam-grey py-4 px-3'>
        <div className='item-center sticky flex h-full w-full flex-col'>
          <div
            onClick={toggleMobileSideBar}
            className='absolute top-0 right-5 flex cursor-pointer items-center justify-center rounded-lg  text-base font-normal text-white hover:bg-gray-700'
          >
            <FontAwesomeIcon
              icon={faEllipsis}
              size='xs'
              className={`w-8 text-sm text-gray-500 ${isMobileSideBarOpen ? 'rotate-0' : 'rotate-90'} transition`}
            />
          </div>
          <ul className='mt-12 space-y-2'>
            {links.map((link) => (
              <li key={link.url}>
                <Link key={link.url} href={link.url}>
                  <a
                    onClick={toggleMobileSideBar}
                    className='flex items-center justify-start rounded-lg p-4 text-lg text-white hover:bg-gray-700'
                  >
                    {link.name}{' '}
                    {link.description && <div className='pl-2 text-xs text-white/50'> - {link.description}</div>}
                  </a>
                </Link>
              </li>
            ))}
            <li className='flex items-center justify-center p-4'>
              <HeaderNetworkSelect className='mr-4 w-max' />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MobileSideBar;
