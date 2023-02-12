import * as React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import useIsMobile from '@/hooks/useIsMobile';

import Header from '@/components/layouts/Header';
import MobileSideBar from '@/components/layouts/MobileSideBar';

import { CurrentNetworkProvider } from '@/contexts/CurrentNetwork';

export interface LinkType {
  url: string;
  name: string;
  description?: string;
}

const links = [
  {
    url: '/',
    name: 'Coin Flip',
    description: '50% chance of doubling your bet',
  },
  {
    url: '/raffle',
    name: 'Raffle',
    description: ' One winning ticket wins all the funds',
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileSideBarOpen, setIsMobileSideBarOpen] = React.useState(false);
  const toggleMobileSideBar = () => setIsMobileSideBarOpen(!isMobileSideBarOpen);
  const isMobile = useIsMobile();

  return (
    <CurrentNetworkProvider>
      <div className='flex h-full w-full flex-col'>
        <Header isMobileSideBarOpen={isMobileSideBarOpen} toggleMobileSideBar={toggleMobileSideBar} links={links} />
        {isMobile && (
          <MobileSideBar
            isMobileSideBarOpen={isMobileSideBarOpen}
            toggleMobileSideBar={toggleMobileSideBar}
            links={links}
          />
        )}
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
    </CurrentNetworkProvider>
  );
}
