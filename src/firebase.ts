import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZdaJgTfY20gY5q5-5WyCIaAN2ranPjRI",
    authDomain: "notes-app-13094.firebaseapp.com",
    projectId: "notes-app-13094",
    storageBucket: "notes-app-13094.firebasestorage.app",
    messagingSenderId: "893239760474",
    appId: "1:893239760474:web:d824d6cd0330d60a016a63",
    measurementId: "G-M4NLLVQH2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, auth, db, analytics };
