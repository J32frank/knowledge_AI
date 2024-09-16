// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CONFIG,
  authDomain: "knowledge-growth-6c71e.firebaseapp.com",
  projectId: "knowledge-growth-6c71e",
  storageBucket: "knowledge-growth-6c71e.appspot.com",
  messagingSenderId: "447315249265",
  appId: "1:447315249265:web:dff54c3b0aa32ea28cf3d0",
  measurementId: "G-20V63VRVE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app)