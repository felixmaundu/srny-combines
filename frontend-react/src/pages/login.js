import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  // const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true on form submission
    console.log('Submitting form with values:', values);
    axios.post('http://localhost:5050/auth/login', values)
      .then(result => {
        console.log('Server response:', result.data);
        if (result.data.loginStatus) {
          localStorage.setItem("valid", true);
          navigate('/');
        } else {
          setError(result.data.Error);
        }
      })
      .catch(err => {
        console.log('Error during login:', err);
        setError('An error occurred during login. Please try again.');
      })
      .finally(() => {
        setLoading(false); // Reset loading state after request completes
      });
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-grow flex flex-col justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500 py-16 px-8 rounded-lg">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-white text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-400"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-white text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-400"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-sky-400 text-white rounded-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
            <a href="#" className="text-white text-sm hover:underline">Forgot password?</a>
          </div>
        </form>
        <p className="text-center text-white text-xs mt-4">Don't have an account? <a href="/registration" className="text-sky-400 hover:underline">Sign Up</a></p>
      </div>
      <div className="hidden lg:flex flex-col justify-center items-center px-16">
        <h2 className="text-3xl font-bold text-gray-800">Serenity</h2>
        <p className="text-gray-600 text-sm mt-4">Find your inner peace at driver's hub.</p>
      </div>
    </div>
  );
};

export default LoginForm;
