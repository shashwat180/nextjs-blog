// Import the functions you need from the SDKs you need
import { initializeApp,getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDmmzHrgHPJK31xYOL2ZEK3oWFq7WokwK0",
  authDomain: "mozaic-e1495.firebaseapp.com",
  projectId: "mozaic-e1495",
  storageBucket: "mozaic-e1495.appspot.com",
  messagingSenderId: "720522947661",
  appId: "1:720522947661:web:bbde670ea16d3b2318c004",
  measurementId: "G-BZPY211SDC"
};

// Initialize Firebase
const app =!getApps().length ? initializeApp(firebaseConfig):getApp();
const firestore = getFirestore(app);
const auth=getAuth(app);
const storage=getStorage(app);
// const analytics = getAnalytics(app);

export {app,firestore, auth, storage};