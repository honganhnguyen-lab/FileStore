import firebase from "firebase/app"

import "firebase/firestore"
import "firebase/storage"


const app = firebase.initializeApp({
    apiKey: "AIzaSyBcTdluBp4WQbuynhxFpyf3JpyXp8LEnK0",
    authDomain: "filestore-55acc.firebaseapp.com",
    databaseURL: "https://filestore-55acc-default-rtdb.firebaseio.com",
    projectId: "filestore-55acc",
    storageBucket: "filestore-55acc.appspot.com",
    messagingSenderId: "6720712836",
    appId: "1:6720712836:web:8a3b7ec1c3e01aa449d2d1"
  });

  const firestore = app.firestore()
  export const database = {
    folders: firestore.collection("folders"),
    files: firestore.collection("files"),
    formatDoc: doc => {
      return { id: doc.id, ...doc.data() }
    },
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
  }
  export const storage = app.storage()
  // export const auth = app.auth()
  export default app

