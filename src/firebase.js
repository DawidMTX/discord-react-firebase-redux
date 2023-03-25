
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBnSTFQFUtUzeVc8YraWPglZr0weXoxlfg",
    authDomain: "discord-59992.firebaseapp.com",
    projectId: "discord-59992",
    storageBucket: "discord-59992.appspot.com",
    messagingSenderId: "452273315128",
    appId: "1:452273315128:web:1510d99d07fb2c1442f5cd"
  };


  const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider(app);

export {auth, provider, db}