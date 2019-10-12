import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBkFH9xPHsqov99GEmS8OOusDnv32PVud8",
  authDomain: "hackupc2019.firebaseapp.com",
  databaseURL: "https://hackupc2019.firebaseio.com",
  projectId: "hackupc2019",
  storageBucket: "hackupc2019.appspot.com",
  messagingSenderId: "614695205103",
  appId: "1:614695205103:web:491196056a17d5ff88031a"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database(); // load firebase database

// Aqui ja es poden fer lectures/escriptures
export default db;
