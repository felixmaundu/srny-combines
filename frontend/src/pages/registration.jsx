import { useState } from 'react';

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement registration logic here (e.g., API call, validation)
    console.log('Submitting registration:', { firstName, lastName, email, confirmEmail });

    // Check if emails match
    if (email !== confirmEmail) {
      alert('Email addresses do not match!');
      return;
    }
  };

  return (
    <form className="flex flex-col space-y-4 w-full max-w-md mx-auto py-8 px-4 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-sm font-medium mb-2">First Name</label>
        <input
          type="text"
          id="firstName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-sm font-medium mb-2">Last Name</label>
        <input
          type="text"
          id="lastName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirmEmail" className="text-sm font-medium mb-2">Confirm Email Address</label>
        <input
          type="email"
          id="confirmEmail"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={confirmEmail}
          onChange={(event) => setConfirmEmail(event.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <a href="#" className="text-sm text-blue-500 hover:underline">Already have an account? Login</a>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">Register</button>
      </div>
    </form>
  );
};

export default RegistrationForm;
