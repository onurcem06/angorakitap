
import React from 'react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-4 py-6 md:px-8 md:py-10 flex justify-center items-center pointer-events-none">
      <div className="pointer-events-auto">
        <Logo className="h-20 md:h-32 lg:h-44" />
      </div>
    </nav>
  );
};

export default Navbar;
