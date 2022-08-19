import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyDxxRSya7rTUOvgmMes-JglT-fOsthtG7g",
  authDomain: "ecommerceapp-5efad.firebaseapp.com",
  projectId: "ecommerceapp-5efad",
  storageBucket: "ecommerceapp-5efad.appspot.com",
  messagingSenderId: "601543381792",
  appId: "1:601543381792:web:4eefb39966a81c82a9bd45"
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth()
export const storage=getFirestore(app)
export const db=getFirestore(app)