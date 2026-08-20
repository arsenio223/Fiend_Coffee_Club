// utils/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUR0V_herd0svokitmU66FYfZPQVPyysQ",
  authDomain: "fiend-coffee-club.firebaseapp.com",
  projectId: "fiend-coffee-club",
  storageBucket: "fiend-coffee-club.firebasestorage.app",
  messagingSenderId: "987361478856",
  appId: "1:987361478856:web:8dc83e064ce39bb1a83dfd",
  measurementId: "G-Y24CP7ZFWH"
};

// Initialize Firebase (prevents multiple initializations)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, app };