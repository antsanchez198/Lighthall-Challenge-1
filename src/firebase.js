import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAHPPs0_jSV4ADE93qqmEp7KFwrmoqJnT0",
    authDomain: "challenge1-back.firebaseapp.com",
    projectId: "challenge1-back",
    storageBucket: "challenge1-back.appspot.com",
    messagingSenderId: "567408446909",
    appId: "1:567408446909:web:e2122e6bf97b3a019a56d4",
    measurementId: "G-JP9CFPNDME"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);