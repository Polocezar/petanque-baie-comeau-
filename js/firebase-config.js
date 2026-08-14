const firebaseConfig = {
  apiKey: "AIzaSyCaECk089No3Oz5y73Bq09O_AsEBMiyt4I",
  authDomain: "petanque-baie-cormeau.firebaseapp.com",
  projectId: "petanque-baie-cormeau",
  storageBucket: "petanque-baie-cormeau.firebasestorage.app",
  messagingSenderId: "810867394691",
  appId: "1:810867394691:web:7b5c80bc761e9c4d4533b6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
