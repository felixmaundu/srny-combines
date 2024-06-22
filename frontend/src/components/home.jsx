// import React, { useState } from 'react';
// import CompleteRegistration from './Complete_Registration';
// import UploadFiles from './UploadFiles';
// import MyAccount from './MyAccount';
// // import Contact from './Contact';

// function Home() {
//   const [activeTab, setActiveTab] = useState('home');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'completeRegistration':
//         return <CompleteRegistration />;
//       case 'uploadFiles':
//         return <UploadFiles />;
//       case 'myAccount':
//         return <MyAccount />;
//       // case 'contact':
//       //   return <Contact />;
//       default:
//         return <h1>Home</h1>;
//     }
//   };

//   return (
//     <>
//       <nav className="flex flex-col h-24 bg-gradient-to-r from-indigo-500 to-blue-500 shadow-md w-full fixed top-0 left-0 z-50">
//         <div className="flex-1 flex items-center justify-center">
//           <h1 className="text-xl font-bold text-white text-center">Serenity</h1>
//         </div>
//         <div className="flex justify-center space-x-8 pb-4">
//           <button onClick={() => setActiveTab('completeRegistration')} className="text-white">Complete Registration</button>
//           <button onClick={() => setActiveTab('uploadFiles')} className="text-white">Upload Files</button>
//           <button onClick={() => setActiveTab('myAccount')} className="text-white">My Account</button>
//           {/* <button onClick={() => setActiveTab('contact')} className="text-white">Contact</button> */}
//         </div>
//       </nav>
//       <div className="mt-24 p-4">
//         {renderContent()}
//       </div>
//     </>
//   );
// }

// export default Home;


import React from 'react'

function Home() {
  return (
    <div>Home</div>
  )
}

export default Home;