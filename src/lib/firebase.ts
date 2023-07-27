import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

const firebaseConfig = {
  apiKey: "AIzaSyCWg-n9BFPXAeNMrj0nlh-obovBActGmG8", // pragma: allowlist secret
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

/**
 * Creates a writable store that tracks the current user's authentication state using the Firebase Authentication library.
 * If Firebase Auth is not initialized or we are rendering on the server, returns a store with a null value.
 * @return {Object} An object with a `subscribe` method that can be used to subscribe to changes in the user's authentication state.
 * The `subscribe` method takes a callback function as its argument, which is called whenever the value of the store changes.
 * The callback function is passed the new value of the store as its argument.
 */
function userStore(): { subscribe: (callback: (value: User | null) => void) => void } {

  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn("Firebase auth not available");
    const { subscribe } = writable<User | null>(null);
    return { subscribe };
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  }
}

export const user = userStore();
