import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAQ5iGKZWsxw0gEcpsrjm-09B8S9l8_57Q",
  authDomain: "g-chat-b833e.firebaseapp.com",
  projectId: "g-chat-b833e",
  storageBucket: "g-chat-b833e.appspot.com",
  messagingSenderId: "201759209300",
  appId: "1:201759209300:web:b949c1f8dd3a69c6a3fac1",
  measurementId: "G-Z8HK7L3YP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};

