import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAJO2b8NZXcfplbM1JIARSn22FZ7ukZcQA",
  authDomain: "appointment-with-death.firebaseapp.com",
  projectId: "appointment-with-death",
  storageBucket: "appointment-with-death.appspot.com",
  messagingSenderId: "405697384525",
  appId: "1:405697384525:web:008fc606a7ffbe624d8c04"
};

initializeApp(firebaseConfig);

export const firestoreDB = getFirestore(); 