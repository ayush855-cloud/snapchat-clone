import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC2TY4r61QbqmPC2QAIuuX40x_evxijCX0",
    authDomain: "snapchat-clone-a8d7c.firebaseapp.com",
    projectId: "snapchat-clone-a8d7c",
    storageBucket: "snapchat-clone-a8d7c.appspot.com",
    messagingSenderId: "464161771184",
    appId: "1:464161771184:web:772f68d7d4ae194a4d3575"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, storage, provider }