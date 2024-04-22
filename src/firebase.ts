import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBibH9LcCRnE_DYa3aU7OtQXh3BRwqXkr8",
  authDomain: "discord-clone-udemy-14893.firebaseapp.com",
  projectId: "discord-clone-udemy-14893",
  storageBucket: "discord-clone-udemy-14893.appspot.com",
  messagingSenderId: "5873756897",
  appId: "1:5873756897:web:ccb350e42b47f3a30165a0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
