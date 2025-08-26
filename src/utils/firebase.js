// Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Log environment variables for debugging
console.log("Firebase Environment Variables:");
console.log("API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "Set" : "Not set");
console.log("Auth Domain:", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "Set" : "Not set");
console.log("Project ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "Set" : "Not set");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBs-5cJ5DKurDCBp-qsOXlKG6-o-YbMk2E",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "bayronix-a54a6.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "bayronix-a54a6",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "bayronix-a54a6.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "913626009703",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:913626009703:web:718962f238b080c767c4c2",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-82P53NBP12"
};

// Initialize Firebase
console.log("Initializing Firebase with config:", { ...firebaseConfig, apiKey: "HIDDEN" });
const app = initializeApp(firebaseConfig);

// Initialize Firestore with direct settings
const db = getFirestore(app);
console.log("Firestore initialized:", db ? "Success" : "Failed");

const auth = getAuth(app);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, db, auth, analytics }; 