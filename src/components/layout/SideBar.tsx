import {
  faCircleQuestion,
  faCoins,
  faEllipsis,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';

const SideBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isBetaPopUpOpen, setIsBetaPopUpOpen] = useState(true);

  return (
    <nav
      className={`navbar-navbar sticky w-0 ${
        isSideBarOpen ? 'md:w-[280px]' : 'md:w-[80px]'
      } transition transition-width duration-100 `}
      aria-label='Sidebar'
    >
      <div className=' item-center flex h-full w-full flex-col justify-between overflow-y-auto bg-gray-900 py-4 px-3'>
        <div className='item-center sticky flex h-full w-full flex-col'>
          <ul className='space-y-2 '>
            <li>
              <div
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                className='mb-10 w-fit cursor-pointer items-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-700'
              >
                <FontAwesomeIcon
                  icon={faEllipsis}
                  size='xs'
                  className={`mx-2 w-3 text-xs text-gray-500 md:mx-1 md:w-6 ${
                    isSideBarOpen ? 'rotate-0' : 'rotate-90'
                  } transition`}
                />
              </div>
            </li>
            <li>
              <Link href='/'>
                <div className='flex cursor-pointer items-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-700'>
                  <FontAwesomeIcon
                    icon={faReceipt}
                    size='xs'
                    className='mx-2 w-3 text-xs text-gray-500 md:mx-1 md:w-6'
                  />
                  {isSideBarOpen && <span className={`ml-3 text-white transition `}>Raffle</span>}
                </div>
              </Link>
            </li>
            <li>
              <Link href='/coinflip'>
                <div className='mt-5 flex cursor-pointer items-center rounded-lg p-2 text-base font-normal text-white hover:bg-gray-700'>
                  <FontAwesomeIcon
                    icon={faCoins}
                    size='xs'
                    className='mx-2 w-3 text-xs text-gray-500 md:mx-1 md:w-7'
                  />
                  {isSideBarOpen && <span className='ml-3 text-white'>CoinFlip</span>}
                </div>
              </Link>
            </li>
            <li>
              <div className='mt-5 flex cursor-pointer items-center rounded-lg p-2 text-base font-normal text-white'>
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  size='xs'
                  className='mx-2 w-3 text-xs text-gray-500 md:mx-1 md:w-7'
                />
                {isSideBarOpen && <span className='ml-3 text-gray-500'>More coming soon</span>}
              </div>
            </li>
          </ul>
          {isSideBarOpen && isBetaPopUpOpen && (
            <div id='dropdown-cta' className='mt-6 rounded-lg  bg-blue-900 p-4' role='alert'>
              <div className='mb-3 flex items-center'>
                <span className='text-orange-800 bg-orange-200 text-orange-900 mr-2 rounded bg-orange px-2.5 py-0.5 text-sm font-semibold'>
                  Beta
                </span>
                <button
                  onClick={() => setIsBetaPopUpOpen(false)}
                  type='button'
                  className='-mx-1.5 -my-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-blue-900   p-1 text-blue-400 hover:bg-blue-800 focus:ring-2 focus:ring-blue-400'
                  data-collapse-toggle='dropdown-cta'
                  aria-label='Close'
                >
                  <span className='sr-only'>Close</span>
                  <svg
                    aria-hidden='true'
                    className='h-4 w-4'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </button>
              </div>
              <p className='mb-3 text-sm text-blue-400'>
                Welcome to MoonVegas! Website is under construction. Your feedback is highly
                appreciated 🎉
              </p>
              <a className='text-sm text-blue-400 underline  hover:text-blue-300' href='#'>
                Give feedback
              </a>
            </div>
          )}
        </div>
        <div className='break-words p-1 text-center text-sm text-gray-500'>
          &copy;{new Date().getFullYear()} MoonVegas
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
