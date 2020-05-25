import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
   apiKey: 'AIzaSyDgg4X2zOf6CnJShIkef2jN-8_3T6Ryn0o',
   authDomain: 'ecommerce-db-27c1e.firebaseapp.com',
   databaseURL: 'https://ecommerce-db-27c1e.firebaseio.com',
   projectId: 'ecommerce-db-27c1e',
   storageBucket: 'ecommerce-db-27c1e.appspot.com',
   messagingSenderId: '981671347843',
   appId: '1:981671347843:web:319d54508531081a9b7db6',
   measurementId: 'G-1E41H5W28P',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
