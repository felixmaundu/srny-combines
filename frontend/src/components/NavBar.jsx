import React from 'react';
import { Link } from 'react-router-dom'; // For routing (optional)

const Navbar = () => {
  return (
    <nav className="h-16 bg-gray-800 text-white flex justify-between items-center px-4">
      <Link to="/" className="text-2xl font-bold">Serenity</Link>
      <div className="hidden lg:flex items-center">
        {/* Add any additional navigation links here */}
      </div>
      {/* Add mobile menu button here (optional for future enhancement) */}
    </nav>
  );
};

export default Navbar;
