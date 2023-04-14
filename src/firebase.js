import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_IIvh0bEWGk4apy2ycpDLz2zGCMkSp7U",
    authDomain: "lighthall-c1-back.firebaseapp.com",
    projectId: "lighthall-c1-back",
    storageBucket: "lighthall-c1-back.appspot.com",
    messagingSenderId: "372650680910",
    appId: "1:372650680910:web:6ec8e7ced9030916c1d91f",
    measurementId: "G-BVB74PVB75"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);