import React from 'react';
import { Link } from 'react-router-dom'; // For routing (optional)

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-gray-800 z-50 transition duration-300 ease-in-out transform ${isOpen ? '-translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full pt-5 px-4 text-white">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">Account</h1>
          <button onClick={toggleSidebar} type="button" className="focus:outline-none">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d="M6 6L18 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="text-base hover:text-gray-400">
              Page 1
            </Link>
          </li>
          <li>
            <Link to="/page2" className="text-base hover:text-gray-400">
              Page 2
            </Link>
          </li>
          <li>
            <Link to="/page3" className="text-base hover:text-gray-400">
              Page 3
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
