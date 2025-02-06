import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDqNAPoPWKKogc_0o_9829cwQx9hqxG-GE',
  authDomain: 'hamsaem-658c8.firebaseapp.com',
  projectId: 'hamsaem-658c8',
  storageBucket: 'hamsaem-658c8.firebasestorage.app',
  messagingSenderId: '153205682134',
  appId: '1:153205682134:web:996b0fb9125e09530bfe77',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectAuth = firebase.auth();

//Initialize Services
const projectFirestore = firebase.firestore();

export { projectFirestore, projectAuth };
