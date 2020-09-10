import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBB-QN2fmJyH8Sp9oXwCkDyZXJTm2UPNXY",
  authDomain: "whatsapp-clone-4a350.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-4a350.firebaseio.com",
  projectId: "whatsapp-clone-4a350",
  storageBucket: "whatsapp-clone-4a350.appspot.com",
  messagingSenderId: "106760289207",
  appId: "1:106760289207:web:3e32da69fcd42d90e78632",
  measurementId: "G-S3H8FQ35G8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;