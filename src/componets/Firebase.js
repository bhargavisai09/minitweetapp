// firebase.js
import { initializeApp ,getApp,getApps} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBnUGmA1WK6Ln1G6AV3L6jFwAFvTwbnE_s",
  authDomain: "twitterapp-34751.firebaseapp.com",
  projectId: "twitterapp-34751",
  storageBucket: "twitterapp-34751.appspot.com",
  messagingSenderId: "452256746215",
  appId: "1:452256746215:android:7075600d5623f55e49f042",
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
