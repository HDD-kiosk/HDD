import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOrR6IcIUNy7T5OQUpvuVAW0dFIqCvhnc",
  authDomain: "hdd-client.firebaseapp.com",
  projectId: "hdd-client",
  storageBucket: "hdd-client.appspot.com",
  messagingSenderId: "452528984612",
  appId: "1:452528984612:web:910969a991b0f5820d7eb1",
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth();
export const dbService = getFirestore();
