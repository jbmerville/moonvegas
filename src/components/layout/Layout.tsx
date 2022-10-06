import * as React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Header from '@/components/layout/Header';
import SideBar from '@/components/layout/SideBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(true);
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

  return (
    <div className='navbar-container grid h-full w-full'>
      <Header isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
      <SideBar isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
      <div className='mt-20 h-full w-full md:mt-0'>{children}</div>
      <ToastContainer
        position='bottom-right'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
