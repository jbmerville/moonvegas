import * as React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import useIsMobile from '@/hooks/useIsMobile';

import Header from '@/components/layouts/Header';
import SideBar from '@/components/layouts/SideBar';

export interface LinkType {
  url: string;
  name: string;
  description?: string;
}

const links = [
  {
    url: '/',
    name: 'Raffle',
    description: ' One winning ticket wins all the funds',
  },
  {
    url: '/coinflip',
    name: 'Coin Flip',
    description: '50% chance of doubling your bet',
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);
  const isMobile = useIsMobile();

  return (
    <div className='flex h-full w-full flex-col'>
      <Header isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} links={links} />
      {isMobile && <SideBar isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} links={links} />}
      <div className='h-full w-full overflow-y-scroll'>{children}</div>
      <ToastContainer
        position='bottom-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={5}
        draggable
        pauseOnHover
      />
    </div>
  );
}
