import React, { useState } from 'react';
import { FaHome, FaFileUpload, FaUser, FaEdit, FaBars } from 'react-icons/fa';
import CompleteRegistration from '../components/Complete_Registration';
import UploadFiles from '../components/UploadFiles';
import MyAccount from '../components/MyAccount';
import Contact from '../components/Contact';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'completeRegistration':
        return <CompleteRegistration />;
      case 'uploadFiles':
        return <UploadFiles />;
      case 'myAccount':
        return <MyAccount />;
      case 'contact':
        return <Contact />;
      default:
        return <h1>Home</h1>;
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* App Bar */}
        <div className="h-16 flex items-center justify-between bg-indigo-500 w-full px-4">
          <div className="flex items-center">
            <button 
              className="text-white lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars size={24} />
            </button>
            <h1 className="text-xl font-bold text-white ml-4 lg:ml-0">Serenity</h1>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Sidebar */}
          <div className={`bg-gray-800 text-white w-64 lg:relative lg:translate-x-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:transform-none`}>
            <div className="flex-1 flex flex-col justify-between">
              <div className="p-4">
                <button onClick={() => setActiveTab('home')} className="flex items-center py-2 px-4 hover:bg-indigo-500 w-full">
                  <FaHome className="mr-3" /> Home
                </button>
                <button onClick={() => setActiveTab('completeRegistration')} className="flex items-center py-2 px-4 hover:bg-indigo-500 w-full">
                  <FaFileUpload className="mr-3" /> Complete Registration
                </button>
                <button onClick={() => setActiveTab('uploadFiles')} className="flex items-center py-2 px-4 hover:bg-indigo-500 w-full">
                  <FaFileUpload className="mr-3" /> Upload Files
                </button>
                <button onClick={() => setActiveTab('myAccount')} className="flex items-center py-2 px-4 hover:bg-indigo-500 w-full">
                  <FaUser className="mr-3" /> My Account
                </button>
                <button onClick={() => setActiveTab('contact')} className="flex items-center py-2 px-4 hover:bg-indigo-500 w-full">
                  <FaEdit className="mr-3" /> Contact
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-6 bg-gray-100">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
