// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const NavItem = ({ to, children }) => (
    <Link
      to={to}
      className="block py-2 px-4 text-gray-900 hover:bg-gray-200 transition duration-300"
     >
      {children}
    </Link>
  );
  
  const SideNav = ({ isOpen, onClose }) => (
    <Transition
      show={isOpen}
      enter="transition ease-out duration-200 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in duration-200 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
        <div className="py-4 px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Account</h2>
            <button onClick={onClose}>
              <XIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          <nav className="mt-4">
            <NavItem to="/">Page 1</NavItem>
            <NavItem to="/page2">Page 2</NavItem>
            <NavItem to="/page3">Page 3</NavItem>
          </nav>
        </div>
      </div>
    </Transition>
  );
  
  const Navbar = ({ onMenuClick }) => (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Serenity</h1>
        <button onClick={onMenuClick}>
          <MenuIcon className="h-6 w-6 text-white md:hidden" />
        </button>
      </div>
    </nav>
  );
  


const TestComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
    return (
        <div>
            <h3>hello test</h3>
            <Navbar onMenuClick={toggleMenu} />
            <SideNav isOpen={isOpen} onClose={closeMenu} />

            <div className="container mx-auto mt-8">
                <Switch>
                    <Route exact path="/">
                        <h2>Page 1 Content</h2>
                    </Route>
                    <Route path="/page2">
                        <h2>Page 2 Content</h2>
                    </Route>
                    <Route path="/page3">
                        <h2>Page 3 Content</h2>
                    </Route>
                </Switch>
            </div>
        </div>
    )
};

export default TestComponent;