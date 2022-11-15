import NavBar from '../NavBar';
import React from 'react';

type NavBarWrapperProps = {
  children: React.ReactNode;
};

const NavBarWrapper = (props: NavBarWrapperProps) => {
  return (
    <div className='flex flex-col bg-surface h-screen overflow-y-auto'>
      <NavBar />
      <div className="flex flex-col space-y-2 mx-auto max-w-7xl w-full h-full">
        {props.children}
      </div>
    </div>
  );
};

export default NavBarWrapper;