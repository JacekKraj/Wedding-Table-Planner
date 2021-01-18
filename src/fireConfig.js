import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCK4Nq3roptDN4Ovb2rsaUdIIxLU4c7HPg",
  authDomain: "wedding-table-planner-eb8df.firebaseapp.com",
  databaseURL: "https://wedding-table-planner-eb8df-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wedding-table-planner-eb8df",
  storageBucket: "wedding-table-planner-eb8df.appspot.com",
  messagingSenderId: "502384682817",
  appId: "1:502384682817:web:2a3dd48a6e6ef6b84a23c0",
  measurementId: "G-PSH14FFYSY",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
