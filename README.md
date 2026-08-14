# Site du Club Bouliste Baie-Comeau

Site du club calqué sur le modèle du site ALCF Basket : effectif (fiche par
joueur), calendrier, résultats & classement, messagerie, infos. Toutes les
données sont saisies **manuellement** dans l'espace admin (pas de fédération,
pas de connexion externe).

## Étape 1 — Mettre le site en ligne sur GitHub Pages

1. Crée un nouveau dépôt GitHub, par exemple `petanque-baie-comeau`.
2. Dans le dépôt, clique sur **Add file → Upload files**.
3. Glisse-dépose **tous** les fichiers et dossiers de ce projet
   (`index.html`, `effectif.html`, `calendrier.html`, `resultats.html`,
   `messagerie.html`, `admin.html`, `css/`, `js/`, `assets/`, en conservant
   la même structure de dossiers).
4. Valide (« Commit changes »).
5. Va dans **Settings → Pages**, choisis la branche `main` et le dossier
   `/ (root)`, puis enregistre. Le site sera disponible à une adresse du
   type `https://tonpseudo.github.io/petanque-baie-comeau/`.

## Étape 2 — Créer le projet Firebase (base de données + connexion admin)

1. Va sur https://console.firebase.google.com et crée un nouveau projet,
   par exemple `petanque-baie-comeau`.
2. Ajoute une application **Web** (icône `</>`) et copie les valeurs de
   configuration proposées.
3. Ouvre le fichier `js/firebase-config.js` dans GitHub (crayon ✏️ pour
   éditer) et remplace les `"REMPLACE_MOI"` par les vraies valeurs.
4. Dans le menu de gauche, active **Firestore Database** → « Créer une
   base de données » → mode production.
5. Toujours dans le menu de gauche, active **Authentication** → onglet
   *Sign-in method* → active **E-mail/Mot de passe**.
6. Dans **Authentication → Users**, clique sur *Add user* et crée le
   compte de connexion de ton ami (e-mail + mot de passe). C'est ce compte
   qui se connectera sur la page `admin.html`.

## Étape 3 — Règles de sécurité Firestore

Dans **Firestore Database → Règles**, colle ceci puis publie :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Tout le monde peut consulter le site
    match /{document=**} {
      allow read: if true;
    }
    // Seule une personne connectée (l'admin) peut modifier joueurs,
    // calendrier, classement et infos du club
    match /joueurs/{id} {
      allow write: if request.auth != null;
    }
    match /calendrier/{id} {
      allow write: if request.auth != null;
    }
    match /equipes/{id} {
      allow write: if request.auth != null;
    }
    match /infos/{id} {
      allow write: if request.auth != null;
    }
    // Les messages peuvent être publiés par n'importe quel visiteur,
    // mais seule la personne connectée peut les supprimer
    match /messages/{id} {
      allow create: if true;
      allow delete, update: if request.auth != null;
    }
  }
}
```

## Étape 4 — Remplir le contenu

Ouvre `https://.../admin.html`, connecte-toi avec le compte créé à
l'étape 2, puis remplis dans l'ordre :

1. **Infos du club** — horaires, adresse, contact, mot du club, et le nom
   de la ligue affiché en haut de la page classement.
2. **Effectif** — une fiche par joueur (photo = un lien d'image en ligne,
   par exemple hébergée sur Google Photos/Imgur).
3. **Calendrier** — les parties à venir et passées.
4. **Classement** — une ligne par équipe (comme sur le tableau papier
   « Ligue à Ti-Guy ») : le site calcule et trie automatiquement le rang
   et le différentiel à partir des points saisis.

Les messages, eux, sont écrits directement par les visiteurs sur la page
« Messagerie » — l'admin peut seulement les supprimer si besoin.

## Structure des fichiers

```
index.html        Accueil (infos, prochaines parties, aperçu classement, derniers messages)
effectif.html      Liste des joueurs + fiche détaillée (fenêtre modale)
calendrier.html    Parties à venir / passées
resultats.html     Classement complet (format du tableau papier)
messagerie.html    Mur de messages, ouvert à tous les visiteurs
admin.html         Connexion + gestion de tout le contenu ci-dessus
css/style.css      Habillage visuel (rouge/noir du club)
js/firebase-config.js   Identifiants du projet Firebase (à remplir)
js/app.js          Fonctions communes (menu, dates, alertes)
assets/            Logo, maillot (référence) et image du tableau papier
```
