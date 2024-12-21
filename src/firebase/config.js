import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD262fW1_JevQJpfvJQ4azlPmxG1vItWn8",
  authDomain: "wine-and-whiskey-haven.firebaseapp.com",
  projectId: "wine-and-whiskey-haven",
  storageBucket: "wine-and-whiskey-haven.firebasestorage.app",
  messagingSenderId: "48248380683",
  appId: "1:48248380683:web:0abfba0eb5c428e1a1d60e",
  measurementId: "G-48NJZC6TRN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services (only free tier services)
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
