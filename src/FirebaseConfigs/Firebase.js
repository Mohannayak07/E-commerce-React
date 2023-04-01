import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FirebaseAPIKEY,
  authDomain: "ecommerceapp-5efad.firebaseapp.com",
  projectId: "ecommerceapp-5efad",
  storageBucket: "ecommerceapp-5efad.appspot.com",
  messagingSenderId: "601543381792",
  appId: process.env.REACT_APP_APPID
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth()
export const storage=getFirestore(app)
export const db=getFirestore(app)