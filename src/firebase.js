
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "DISCORD-PROJECT",
    authDomain: "DISCORD-PROJECT",
    projectId: "DISCORD-PROJECT",
    storageBucket: "DISCORD-PROJECT",
    messagingSenderId: "DISCORD-PROJECT",
    appId: "DISCORD-PROJECT",
  };


  const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider(app);

export {auth, provider, db}