import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC3oPWvm_CCLcZlKP2NNZ-gXeO4R48dDBI",
    authDomain: "lighthall-challenge1.firebaseapp.com",
    projectId: "lighthall-challenge1",
    storageBucket: "lighthall-challenge1.appspot.com",
    messagingSenderId: "55889791826",
    appId: "1:55889791826:web:230787c0425ec7a3da888b",
    measurementId: "G-2QX7TVRVCG"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);