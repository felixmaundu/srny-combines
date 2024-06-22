import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
} from '../redux/user/userSlice';
import { useQuery } from "@tanstack/react-query";

function MyAccount({userId}) {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        dispatch(fetchUserStart());
        console.log('Fetching user details for:', currentUser.id); // Log user ID
        const res = await fetch(`http://localhost:5050/auth/${currentUser.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}`
          }
        });
        const data = await res.json();
        console.log('Fetched user details:', data); // Log fetched data

        if (!data.success) {
          dispatch(fetchUserFailure(data));
          return;
        }
        dispatch(fetchUserSuccess(data));
      } catch (error) {
        console.error('Error fetching user details:', error); // Log error
        dispatch(fetchUserFailure(error));
      }
    };

    if (currentUser && currentUser.id) {
      fetchUserDetails();
    }
  }, [currentUser, dispatch]);

  console.log('Current user state:', currentUser.id); // Log current user state
 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user details: {error.message}</div>;
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-gray-700">First Name:</label>
          <p className="text-gray-900">{currentUser?.first_name}</p>
        </div>
        <div>
          <label className="block text-gray-700">Last Name:</label>
          <p className="text-gray-900">{currentUser?.last_name}</p>
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <p className="text-gray-900">{currentUser?.email}</p>
        </div>
      
      </div>
    </div>
  );
}

export default MyAccount;
