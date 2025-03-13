// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAidq8Q29kdCCFnFeTyK00yVYqdJrpu7XQ",
  authDomain: "venturelink-database.firebaseapp.com",
  projectId: "venturelink-database",
  storageBucket: "venturelink-database.firebasestorage.app",
  messagingSenderId: "625564602887",
  appId: "1:625564602887:web:f8827c047f1aebb42c90a2",
  measurementId: "G-HMHW7BD8FV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firestore = getFirestore(app);

