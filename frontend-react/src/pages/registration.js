import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true on form submission

    if (values.password !== values.confirmPassword) {
      alert('Passwords do not match!');
      setLoading(false); // Reset loading state
      return;
    }

    axios.post('http://localhost:5050/auth/signup', values)
      .then(result => {
        if (result.data.registrationStatus) {
          setValues({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
          navigate('/login');
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => {
        setError('Network error or server issue');
      })
      .finally(() => {
        setLoading(false); // Reset loading state after request completes
      });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Side */}
      <div className="hidden lg:flex flex-1 bg-indigo-500 text-white flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Serenity</h1>
        <p className="text-xl">Registration</p>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="flex flex-col space-y-4 w-full max-w-md p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold text-center lg:hidden">Serenity</h1>
          <h2 className="text-xl text-center lg:hidden mb-4">Registration</h2>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                id="first_name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={values.first_name}
                onChange={(e) => setValues({...values, first_name: e.target.value})}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                id="last_name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={values.last_name}
                onChange={(e) => setValues({...values, last_name: e.target.value})}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={values.email}
                onChange={(e) => setValues({...values, email: e.target.value})}
                required
              />
            </div>
           
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={values.password}
                onChange={(e) => setValues({...values, password: e.target.value})}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={values.confirmPassword}
                onChange={(e) => setValues({...values, confirmPassword: e.target.value})}
                required
              />
            </div>
            {/* Repeat similar structure for other input fields */}
            <div className="flex items-center justify-between">
              <a href="/login" className="text-sm text-blue-500 hover:underline">Already have an account? Login</a>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                {loading ? 'Loading...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
