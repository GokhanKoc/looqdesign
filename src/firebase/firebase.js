import firebase from 'firebase';

// should go in a secret file
const config = {
  apiKey: "AIzaSyB5IOgzopaf-9WLkG8u1eX_CNy6XGu4J24",
  authDomain: "looq-1166f.firebaseapp.com",
  databaseURL: "https://looq-1166f.firebaseio.com",
  projectId: "looq-1166f",
  storageBucket: "looq-1166f.appspot.com",
  messagingSenderId: "672453373918"
};
firebase.initializeApp(config);

export default firebase;
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
export const firebaseStorage = firebase.storage();
