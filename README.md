# Site du Club Bouliste Baie-Comeau

Site du club calqué sur le modèle du site ALCF Basket : effectif (fiche par
joueur), calendrier, résultats & classement, messagerie, infos, et un
système d'inscription des joueurs validée par l'administrateur — un peu
comme ALCF. Toutes les données sont saisies **manuellement** dans l'espace
admin (pas de fédération, pas de connexion externe).

## Comment ça fonctionne

- **Un compte administrateur** (celui de ton ami) gère tout le contenu du
  site depuis `admin.html` : infos, effectif, calendrier, classement,
  validation des inscriptions, modération des messages.
- **Les joueurs** s'inscrivent eux-mêmes depuis `inscription.html` (fiche
  complète + mot de passe). Leur compte reste **en attente** tant que
  l'admin ne l'a pas approuvé dans l'onglet « Inscriptions à valider ».
- Une fois **approuvés**, les joueurs apparaissent dans l'effectif public
  et peuvent se connecter (`connexion.html`) pour **écrire dans la
  messagerie** du club (identité automatique, plus besoin de taper leur
  nom à chaque message).
- Les visiteurs non connectés peuvent toujours **consulter** tout le site
  (effectif, calendrier, classement, messages), mais pas écrire de
  messages ni rien modifier.

## Étape 1 — Mettre le site en ligne sur GitHub Pages

1. Crée un nouveau dépôt GitHub, par exemple `petanque-baie-comeau`.
2. Dans le dépôt, clique sur **Add file → Upload files**.
3. Glisse-dépose **tous** les fichiers et dossiers de ce projet en
   conservant la même structure de dossiers.
4. Valide (« Commit changes »).
5. Va dans **Settings → Pages**, choisis la branche `main` et le dossier
   `/ (root)`, puis enregistre. Le site sera disponible à une adresse du
   type `https://tonpseudo.github.io/petanque-baie-comeau/`.

## Étape 2 — Créer le projet Firebase (base de données + connexion admin)

1. Va sur https://console.firebase.google.com et crée un nouveau projet.
2. Ajoute une application **Web** (icône `</>`) et copie les valeurs de
   configuration proposées dans `js/firebase-config.js`.
3. Active **Firestore Database** → mode production.
4. Active **Authentication** → *Sign-in method* → **E-mail/Mot de passe**.
5. Dans **Authentication → Users**, crée le compte de connexion de
   l'administrateur (ton ami) : e-mail + mot de passe. **Note bien
   l'identifiant utilisateur (UID)** affiché dans la liste — il ressemble
   à `xNDtn8Rc4kSOzzNgZmMmFJ...` : il servira à l'étape 3.

## Étape 3 — Déclarer ce compte comme administrateur

C'est ce qui distingue le compte admin des comptes joueurs. Dans
**Firestore Database → Données** :

1. Clique sur **Démarrer une collection** (ou "+ Ajouter une collection").
2. Nom de la collection : `admins`
3. ID du document : colle exactement l'**UID** du compte admin noté à
   l'étape 2.
4. Ajoute n'importe quel champ, par exemple `actif` (type booléen) = `true`.
5. Enregistre.

Sans ce document, même le bon e-mail/mot de passe ne donnera pas accès à
`admin.html` — c'est la protection qui empêche un joueur normal d'entrer
dans l'espace admin.

## Étape 4 — Règles de sécurité Firestore

Dans **Firestore Database → Règles**, remplace tout par ceci puis publie :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function estAdmin() {
      return request.auth != null
        && exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    function estMembreApprouve() {
      return request.auth != null
        && exists(/databases/$(database)/documents/joueurs/$(request.auth.uid))
        && get(/databases/$(database)/documents/joueurs/$(request.auth.uid)).data.statut == 'approuve';
    }

    match /infos/{id} {
      allow read: if true;
      allow write: if estAdmin();
    }
    match /joueurs/{id} {
      allow read: if true;
      // Un visiteur peut créer SA PROPRE fiche via l'inscription (statut "en_attente" uniquement)
      allow create: if estAdmin()
        || (request.auth != null && request.auth.uid == id && request.resource.data.statut == 'en_attente');
      allow update, delete: if estAdmin();
    }
    match /calendrier/{id} {
      allow read: if true;
      allow write: if estAdmin();
    }
    match /equipes/{id} {
      allow read: if true;
      allow write: if estAdmin();
    }
    match /messages/{id} {
      allow read: if true;
      allow create: if estAdmin() || estMembreApprouve();
      allow update, delete: if estAdmin();
    }
    match /admins/{id} {
      // Géré uniquement à la main depuis la console Firebase (étape 3)
      allow read, write: if false;
    }
  }
}
```

## Étape 5 — Remplir le contenu

Ouvre `https://.../admin.html`, connecte-toi avec le compte admin, puis
remplis dans l'ordre :

1. **Infos du club** — horaires, adresse, contact, mot du club, nom de la
   ligue.
2. **Inscriptions à valider** — dès qu'un joueur s'inscrit sur
   `inscription.html`, sa demande apparaît ici. Clique **Approuver** pour
   qu'il apparaisse dans l'effectif et puisse écrire sur la messagerie
   (ou **Refuser** pour supprimer la demande).
3. **Effectif** — tu peux aussi ajouter un joueur toi-même directement
   ici (il apparaîtra dans l'effectif, mais n'aura pas de compte de
   connexion, sauf si tu lui crées un compte dans Firebase
   Authentication).
4. **Calendrier** — les parties à venir et passées.
5. **Classement** — une ligne par équipe, comme sur le tableau papier
   « Ligue à Ti-Guy ».

Les joueurs approuvés se connectent eux-mêmes sur `connexion.html` pour
écrire des messages sur `messagerie.html`.

> Limite à connaître : si tu « refuses » une inscription, sa fiche est
> supprimée mais son compte de connexion (créé par Firebase lors de
> l'inscription) reste techniquement actif. Il ne pourra plus rien voir
> ni écrire (il n'a plus de fiche approuvée), mais son compte existera
> toujours dans Authentication → Users si tu veux le supprimer
> complètement là-bas.

## Structure des fichiers

```
index.html         Accueil (infos, prochaines parties, aperçu classement, derniers messages)
effectif.html       Liste des joueurs approuvés + fiche détaillée (fenêtre modale)
calendrier.html     Parties à venir / passées
resultats.html      Classement complet (format du tableau papier)
messagerie.html     Messages — lecture publique, écriture réservée aux membres approuvés
inscription.html    Fiche d'inscription d'un joueur (compte en attente de validation)
connexion.html      Connexion des membres (accès à la messagerie)
admin.html          Connexion admin + gestion de tout le contenu (inscriptions, effectif, calendrier, classement, messages)
css/style.css       Habillage visuel (rouge/noir du club)
js/firebase-config.js   Identifiants du projet Firebase
js/app.js           Fonctions communes (menu, dates, alertes, état de connexion dans la nav)
assets/             Logo, maillot (référence) et image du tableau papier
```

