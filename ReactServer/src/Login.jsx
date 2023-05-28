import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAsUqwvfBBs7EOuTabA7_Aza9yeVNay_LU",
  authDomain: "d-chain-e7ada.firebaseapp.com",
  projectId: "d-chain-e7ada",
  storageBucket: "d-chain-e7ada.appspot.com",
  messagingSenderId: "981183354862",
  appId: "1:981183354862:web:d989543ab37cbd4f5560ff",
  measurementId: "G-L9ET0GBDZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [gLoader,setGLoader] = useState(false);
  
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setLoader(false)
        const user = userCredential.user;
        localStorage.setItem("accessToken", user.accessToken)
        // history.push('/dashboard');
        window.location.href = '/dashboard';

      })
      .catch((error) => {
        // const errorCode = error.code;
        setLoader(false)
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = getErrorMessage(errorCode);
        setErrorMessage(errorMessage);

      });
  };
  function getErrorMessage(errorCode) {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Invalid email address. Please enter a valid email.";
      case "auth/user-disabled":
        return "Your account has been disabled. Please contact support.";
      case "auth/user-not-found":
        return "User not found. Please check your email address.";
      case "auth/wrong-password":
        return "Incorrect Password";
      // Add more error codes and their corresponding messages as needed
      default:
        return "An error occurred. Please try again later.";
    }
  }


  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      localStorage.setItem("accessToken", user.accessToken);
        setGLoader(false)
        // history.push('/dashboard');
      window.location.href = '/dashboard';

    } catch (error) {
      const errorMessage = error.message;
        setGLoader(false)
        setErrorMessage(errorMessage);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      window.location.href = '/dashboard';
    }
  })

  return (<>
    {errorMessage && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="bg-white p-8 rounded-lg">
          <p className="text-lg font-semibold mb-4">Registration Failed!</p>
          <p>{errorMessage}</p>
          <button
            className="w-full py-2 px-4 rounded-lg bg-[#21A494] text-white font-semibold hover:bg-green-400 mt-4"
            onClick={() => setErrorMessage('')}
          >
            OK
          </button>
        </div>
      </div>
    )}
    <div Style="position: absolute;z-index:-100; width: 100%; height: 800px; left: 0; top: 0; background: linear-gradient(180deg, #52AF7B 0%, rgba(4, 127, 112, 0.7) 100%);" className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div class="absolute left-216 top-208 bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-xl flex max-h-fit flex-row gap-2" Style="width: 800px;">
        <div class="w-475 h-663 bg-cover bg-center bg-no-repeat rounded-tl-42 rounded-bl-42 w-1/2"><img src="./login.jpg" alt="" srcset="" className='  rounded-l-lg' /></div>
        <div className='flex flex-col gap-11  '>
          <div className="head">
            <div class="flex flex-col items-start p-0 mt-9 ml-3 gap-11">
              <div class="font-outfit font-medium text-3xl leading-9 text-green-800">Login</div>
              {/* <div class="w-119 h-2 border-3 border-green-800 transform -rotate-0.22"></div> */}

            </div>
          </div>
          <div class="flex flex-col items-start justify-center p-0 ml-4 gap-10 ">

            <div class="flex flex-col items-center p-0 mt-4 ml-3 gap-10 pt-2">
              <div className="flex flex-col gap-5">
                <div className="email flex flex-col gap-1">
                  <label htmlFor='email' class="font-outfit font-medium text-l leadi ng-9">Institute Email</label>
                  <input id='email' type="text" className='border rounded-lg pl-3 ' Style="width: 300px;height: 43px;" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="pass flex flex-col gap-1">
                  <label htmlFor='pass' class="font-outfit font-medium text-l leadi ng-9">Password</label>
                  <input id='pass' type="password" className='border rounded-lg pl-3' value={password} Style="width: 300px;height: 43px;" onChange={(event) => setPassword(event.target.value)} />
                </div>
              </div>
              <div className="flex flex-col text-center gap-3">

                <button class="bg-[#21A494] backdrop-filter backdrop-blur-lg py-2 px-4 shadow-md text-white rounded-lg hover:bg-opacity-90 duration-300 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 justify-center flex flex-row align-center gap-3 " onClick={(event)=>{setLoader(true);handleLogin(event)}}>{loader&&<div className="loader"></div>}<div className='text-center h-full flex flex-wrap content-center'>Login</div></button>
                <div className="or">OR</div>
                <button class="py-2 px-4 flex flex-row gap-3 flex-wrap shadow-md text-[#64B5E2] rounded-lg bg-[#F2F2F2] hover:bg-[#F2F2F2] focus:ring-4 focus:outline-none focus:ring-[#64B5E2] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center backdrop-filter backdrop-blur-lg bg-opacity-30" onClick={()=>{setGLoader(true);handleGoogleLogin()}} Style="border: 1px solid #64B5E2;border-radius: 19px;">
                {gLoader?<div className="loader"></div>:<img src="./google.svg" alt="Google" class="w-5 h-5"></img>}
                    <span className='text-center h-full flex flex-wrap content-center'>Login with Google</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* <div className="text-4xl font-bold text-[#f66e1a] mb-8">Login</div>
      <div className="bg-white p-8 w-max rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="email" className="text-lg font-semibold mb-1">
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
        <button
          className="w-full py-2 px-4 rounded-lg bg-[#f66e1a] text-white font-semibold hover:bg-[#fc680d]"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="w-full mt-4 py-2 px-4 rounded-lg bg-[#4285F4] text-white font-semibold hover:bg-[#1A73E8]"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
      </div> */}
    </div>
  </>

  );
}
