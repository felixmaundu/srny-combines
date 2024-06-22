import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaHome, FaCity, FaIdCard, FaPhone, FaFile } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const CompleteRegistration = () => {
  const { currentUser } = useSelector((state) => state.user); // Access current user from Redux store

  const [gender, setGender] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState('');
  const [socialSecurityCardNumber, setSocialSecurityCardNumber] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!currentUser || !currentUser.token) {
      console.error('User is not authenticated');
      return;
    }

    const registrationData = {
      userId: currentUser.id,
      gender,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      drivingLicenseNumber,
      socialSecurityCardNumber,
      resumeUrl,
      mobilePhoneNumber
    };

    try {
      const response = await fetch('http://localhost:5050/user-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify(registrationData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        // Optionally handle success (e.g., navigate to another page, show success message)
      } else {
        console.error('Registration failed:', data);
        // Optionally handle failure (e.g., show error message)
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  return (
    <>
      <div>
        <h1>complete</h1>
        <form className="flex flex-col  bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
          {/* Gender */}
          <div className="flex flex-col m-20">
            <label htmlFor="gender" className="text-sm font-medium mb-2">Gender</label>
            <select
              id="gender"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Address Line 1 */}
          <div className="flex flex-col m-20">
            <label htmlFor="addressLine1" className="text-sm font-medium mb-2">Address Line 1</label>
            <div className="relative">
              <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="addressLine1"
                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
              />
            </div>
          </div>


          {/* Address Line 2 */}
          <div className="flex flex-col m-20">
            <label htmlFor="addressLine2" className="text-sm font-medium mb-2">Address Line 2</label>
            <div className="relative">
              <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="addressLine2"
                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
          </div>

          {/* City */}
          <div className="flex flex-col m-20">
            <label htmlFor="city" className="text-sm font-medium mb-2">City</label>
            <div className="relative">
              <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="city"
                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>

          {/* State */}
          <div className="flex flex-col m-20">
            <label htmlFor="state" className="text-sm font-medium mb-2">State</label>
            <input
              type="text"
              id="state"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>

          {/* Zip Code */}
          <div className="flex flex-col m-20">
            <label htmlFor="zipCode" className="text-sm font-medium mb-2">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              pattern="\d{5}"
              title="Zip Code should be 5 digits"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>

          {/* Country */}
          <div className="flex flex-col m-20">
            <label htmlFor="country" className="text-sm font-medium mb-2">Country</label>
            <input
              type="text"
              id="country"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          {/* Driving License Number */}
          <div className="flex flex-col m-20">
            <label htmlFor="drivingLicenseNumber" className="text-sm font-medium mb-2">Driving License Number</label>
            <div className="relative">
              <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="drivingLicenseNumber"
                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={drivingLicenseNumber}
                onChange={(e) => setDrivingLicenseNumber(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Social Security Card Number */}
          <div className="flex flex-col m-20">
            <label htmlFor="socialSecurityCardNumber" className="text-sm font-medium mb-2">Social Security Card Number</label>
            <div className="relative">
              <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="socialSecurityCardNumber"
                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={socialSecurityCardNumber}
                onChange={(e) => setSocialSecurityCardNumber(e.target.value)}
                required
              />
            </div>
          </div>


          {/* Mobile Phone Number */}
          <div className="flex flex-col m-20">
            <label htmlFor="mobilePhoneNumber" className="text-sm font-medium mb-2">Mobile Phone Number</label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                id="mobilePhoneNumber"
                pattern="\d{10}"
                title="Mobile phone number should be 10 digits"
                className="pl-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={mobilePhoneNumber}
                onChange={(e) => setMobilePhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 mr-20 ml-20 mb-20">Complete Registration</button>
        </form>
      </div>
    </>
  );
}

export default CompleteRegistration;
