import NavBar from '../NavBar';
import React from 'react';

type NavBarWrapperProps = {
  children: React.ReactNode;
};

const NavBarWrapper = (props: NavBarWrapperProps) => {
  return (
    <div className='flex flex-col bg-surface h-screen overflow-y-auto dark:[color-scheme:dark]'>
      <NavBar />
      <div className="flex flex-col space-y-2 mx-auto max-w-7xl w-full h-full px-6">
        {props.children}
      </div>
    </div>
  );
};

export default NavBarWrapper;