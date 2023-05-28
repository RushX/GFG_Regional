import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAsUqwvfBBs7EOuTabA7_Aza9yeVNay_LU",
    authDomain: "d-chain-e7ada.firebaseapp.com",
    projectId: "d-chain-e7ada",
    storageBucket: "d-chain-e7ada.appspot.com",
    messagingSenderId: "981183354862",
    appId: "1:981183354862:web:d989543ab37cbd4f5560ff",
    measurementId: "G-L9ET0GBDZC"
};
const app = initializeApp(firebaseConfig);

export {app}