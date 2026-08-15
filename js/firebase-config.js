/* ============================================================
   CONFIGURATION FIREBASE — CLUB BOULISTE BAIE-COMEAU
   ============================================================
   1. Va sur https://console.firebase.google.com
   2. Crée un NOUVEAU projet (ex: "petanque-baie-comeau")
   3. Ajoute une application Web (icône </>)
   4. Copie les valeurs qu'on te donne et colle-les ci-dessous
   5. Active "Firestore Database" (mode production) et
      "Authentication" > méthode "E-mail/mot de passe"
   6. Crée un compte (ton ami) dans Authentication > Users
      -> c'est ce compte qui pourra se connecter sur /admin.html
   ============================================================ */

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
