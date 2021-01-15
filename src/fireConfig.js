import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD2p4z3CuerIUO7BErNrm99S3Fm5Q3t6fg",
  authDomain: "wesele-b3231.firebaseapp.com",
  databaseURL: "https://wesele-b3231.firebaseio.com",
  projectId: "wesele-b3231",
  storageBucket: "wesele-b3231.appspot.com",
  messagingSenderId: "805363529903",
  appId: "1:805363529903:web:19041e11ddbf4b937f7c5a",
  measurementId: "G-ESP7PTK53M",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
