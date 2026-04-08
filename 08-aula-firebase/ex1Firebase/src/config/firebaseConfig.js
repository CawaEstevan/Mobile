import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBEkbE7lOtUjYpccjqrkGE57GoPrOv5hpQ",
  authDomain: "tico-app-verdadeiro.firebaseapp.com",
  projectId: "tico-app-verdadeiro",
  storageBucket: "tico-app-verdadeiro.firebasestorage.app",
  messagingSenderId: "238666983960",
  appId: "1:238666983960:web:760a77fc3c7db7eb10716d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);