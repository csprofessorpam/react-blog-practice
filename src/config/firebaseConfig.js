// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore'
//allows you to connect to db

//for auth
import {getAuth} from 'firebase/auth'

//for storage
import {getStorage} from 'firebase/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log("config api", process.env.REACT_APP_API_KEY)
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANLHQXM4eTpukmM-uQeG4z8nG3oNxkDbM",
  authDomain: "blogtest-89647.firebaseapp.com",
  projectId: "blogtest-89647",
  storageBucket: "blogtest-89647.appspot.com",
  messagingSenderId: "894849334747",
  appId: "1:894849334747:web:70f3f02a0ef07aa076bbfe"
};

//apiKey: "AIzaSyANLHQXM4eTpukmM-uQeG4z8nG3oNxkDbM",

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

//set up database and export it
export const db = getFirestore(app)

//set up auth and export it
export const auth = getAuth(app)

//set up storage and activate
export const storage = getStorage(app)