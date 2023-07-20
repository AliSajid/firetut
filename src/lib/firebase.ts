import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWg-n9BFPXAeNMrj0nlh-obovBActGmG8",
  authDomain: "svelte-course-fireship-5e756.firebaseapp.com",
  projectId: "svelte-course-fireship-5e756",
  storageBucket: "svelte-course-fireship-5e756.appspot.com",
  messagingSenderId: "183981197776",
  appId: "1:183981197776:web:c5b6ca855dfca42b27d1d5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
