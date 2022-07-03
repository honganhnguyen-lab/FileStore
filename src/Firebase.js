import { initializeApp } from "firebase/app";
import  {getFirestore} from "@firebase/firestore"
import {collection, serverTimestamp} from "@firebase/firestore"
import "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyBcTdluBp4WQbuynhxFpyf3JpyXp8LEnK0",
    authDomain: "filestore-55acc.firebaseapp.com",
    databaseURL: "https://filestore-55acc-default-rtdb.firebaseio.com",
    projectId: "filestore-55acc",
    storageBucket: "filestore-55acc.appspot.com",
    messagingSenderId: "6720712836",
    appId: "1:6720712836:web:8a3b7ec1c3e01aa449d2d1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const firestore = getFirestore(app);

export const database = {
  folders: collection(firestore, 'folders'),
  files: collection( firestore,'files'),
  formatDoc: (doc) => {
    return {id: doc.id, ...doc.data()}
  },
  getCurrentTimestamp: serverTimestamp()
}


// export const auth = app.auth();

export default app

