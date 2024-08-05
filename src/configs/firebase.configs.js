// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo7rgTn6KJCXWixt6ti2RhcNMLdkEOgq0",
  authDomain: "uploadimage-e45cd.firebaseapp.com",
  projectId: "uploadimage-e45cd",
  storageBucket: "uploadimage-e45cd.appspot.com",
  messagingSenderId: "92049720503",
  appId: "1:92049720503:web:7175ded47ae373a5aef932",
  measurementId: "G-7KDNNF5DF9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
