import React, { useState } from 'react';
import axios from 'axios';
export default function SignupPage() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rPassword, setRPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = () => {
    if (password !== null) {
      if (password === rPassword) {
        axios
          .post(`http://34.131.172.11:5000/api/user/create`, {
            name: name,
            email: email,
            password: password,
          })
          .then((response) => {
            console.log(response.data);
            
            setRegistrationSuccess(true);
          })
          .catch((error) => {
            console.log(error.response.data)
            if (error.response && error.response.data && error.response.data.message) {
              setErrorMessage(error.response.data.message);
            } else {
              setErrorMessage('Failed to register user.');
            }
          });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-4xl font-bold text-[#f66e1a] mb-8">वैद्य-Chain</div>
      <div className="bg-white p-8 w-max rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="Name" className="text-lg font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-2">
          <div className="mb-4">
            <label htmlFor="Name" className="text-lg font-semibold mb-1">
              Phone Number
            </label>
            <input
              type="number"
              id="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Name" className="text-lg font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-lg font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rpassword" className="text-lg font-semibold mb-1">
            Re-enter Password
          </label>
          <input
            type="password"
            id="rpassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            value={rPassword}
            onChange={(e) => setRPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full py-2 px-4 rounded-lg bg-[#f66e1a] text-white font-semibold hover:bg-[#fc680d]"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>

      {registrationSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-lg font-semibold mb-4">Registration Successful!</p>
            <p>You can now log in using the button below.</p>
            <button
              className="w-full py-2 px-4 rounded-lg bg-[#f66e1a] text-white font-semibold hover:bg-[#fc680d] mt-4"
              onClick={() => setRegistrationSuccess(false)}
            >
              Log In
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-lg font-semibold mb-4">Registration Failed!</p>
            <p>{errorMessage}</p>
            <button
              className="w-full py-2 px-4 rounded-lg bg-[#f66e1a] text-white font-semibold hover:bg-[#fc680d] mt-4"
              onClick={() => setErrorMessage('')}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
