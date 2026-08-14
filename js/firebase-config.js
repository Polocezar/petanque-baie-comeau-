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
  apiKey: "REMPLACE_MOI",
  authDomain: "REMPLACE_MOI.firebaseapp.com",
  projectId: "REMPLACE_MOI",
  storageBucket: "REMPLACE_MOI.appspot.com",
  messagingSenderId: "REMPLACE_MOI",
  appId: "REMPLACE_MOI"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
