
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA9PTaUkd1yEO4NsyV6s0wsFQ3VeQXEg14",
  authDomain: "ytvideo-28a6f.firebaseapp.com",
  projectId: "ytvideo-28a6f",
  storageBucket: "ytvideo-28a6f.appspot.com",
  messagingSenderId: "385117145449",
  appId: "1:385117145449:web:4ed01eb4cb67d7709195f8"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const provider = new GoogleAuthProvider()
export default app;