import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAB5Cxka7EdG0hdX3LiZxvYyr186btR4H0",
  authDomain: "live-chat-room-36e9c.firebaseapp.com",
  projectId: "live-chat-room-36e9c",
  storageBucket: "live-chat-room-36e9c.appspot.com",
  messagingSenderId: "799958359672",
  appId: "1:799958359672:web:8008ffead72bc41e34178d",
  measurementId: "G-9RPEVHQ1B2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);