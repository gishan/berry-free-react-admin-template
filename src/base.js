// import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

const REACT_APP_FIREBASE_KEY="AIzaSyCd6P6yPcuvDXAdPPqO3UImpx-b1E0SAuM"
const REACT_APP_FIREBASE_DOMAIN="online-math-institute.firebaseapp.com"
const REACT_APP_FIREBASE_PROJECT_ID="nline-math-institute"
const REACT_APP_FIREBASE_STORAGE_BUCKET="ionline-math-institute.appspot.com" 
const REACT_APP_FIREBASE_SENDER_ID="479138693326"
const REACT_APP_FIREBASE_APP_ID="1:479138693326:web:e6a4408f9a19ddb184909f"
const REACT_APP_FIREBASE_MEASUREMENT_ID="G-EZ0ZM3TNMN"

const app = initializeApp({
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: REACT_APP_FIREBASE_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID
});

export default app; 