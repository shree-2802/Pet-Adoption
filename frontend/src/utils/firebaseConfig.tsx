import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: key,
  authDomain: "pet-adoption-be6a3.firebaseapp.com",
  projectId: id,
  storageBucket: "pet-adoption-be6a3.appspot.com",
  messagingSenderId: id,
  appId: app id
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDB=getStorage(app);
