// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgZFuglVKMNc1zS2wguffPSOhn1ynDX64",
  authDomain: "todo-task-8dd78.firebaseapp.com",
  projectId: "todo-task-8dd78",
  storageBucket: "todo-task-8dd78.appspot.com",
  messagingSenderId: "752546709199",
  appId: "1:752546709199:web:52af1230e744204d4ac1ba",
  measurementId: "G-1JS0V41Q7Z"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);


