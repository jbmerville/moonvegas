import * as React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Header from '@/components/layouts/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(true);
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

  return (
    <div className='flex h-full w-full flex-col'>
      <Header isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
      {/* <SideBar isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} /> */}
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
