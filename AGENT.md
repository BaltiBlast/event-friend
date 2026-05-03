# Gay'vent — Instructions projet

## Stack

Le projet utilise :

- Node.js
- Express
- EJS
- Pico.css

Le projet utilise les ES Modules.

Utiliser :

- import
- export

Ne pas utiliser CommonJS :

- require
- module.exports

Sauf si un fichier existant l’utilise déjà explicitement.

## Architecture

Le projet suit une architecture modulaire orientée feature.

Chaque module métier est placé dans le dossier module/.

Chaque module doit suivre cette structure :

module/
nomDuModule/
nomDuModule.routes.js
nomDuModule.controllers.js
nomDuModule.services.js

## Routing

Le fichier \*.routes.js de chaque module doit être importé dans le fichier router.js à la racine du projet.

Le fichier router.js regroupe tous les routers de tous les modules.

Les routes des modules ne doivent pas être déclarées directement dans app.js.

Chaque fichier \*.routes.js doit :

- créer un router Express
- déclarer les routes du module
- appeler les controllers du module
- exporter le router du module

## Responsabilités

### Routes

Les fichiers \*.routes.js doivent uniquement :

- déclarer les routes Express du module
- appliquer les middlewares nécessaires
- appeler les controllers du module
- exporter le router du module

Ils ne doivent pas contenir de logique métier.

### Controllers

Les fichiers \*.controllers.js doivent :

- récupérer les données depuis req
- appeler les services
- gérer la réponse HTTP
- gérer les erreurs simples liées à la requête

Ils ne doivent pas contenir la logique métier principale.

### Services

Les fichiers \*.services.js doivent contenir :

- la logique métier
- les traitements de données
- les appels aux models si nécessaire
- les règles métier du module

## Flux attendu

Le flux doit toujours rester :

routes -> controllers -> services -> models

Ne pas appeler directement un service depuis une route si un controller existe.

## Frontend

Les vues utilisent EJS.

Le style repose sur Pico.css.

Privilégier :

- le HTML sémantique
- les composants simples
- les styles natifs de Pico.css

Éviter :

- les classes CSS inutiles
- l’ajout d’un autre framework CSS
- le style inline sauf cas justifié

## Dépendances

Le projet utilise npm.

Ne pas installer, supprimer ou remplacer de package sans demande explicite.

Ne pas modifier package.json ou package-lock.json sans demande explicite.

Avant de proposer une nouvelle dépendance :

- vérifier si une dépendance existante peut déjà répondre au besoin
- expliquer pourquoi la nouvelle dépendance serait utile
- attendre validation avant modification

## Conventions

Garder les noms de fichiers cohérents avec le nom du module.

Ne pas mélanger plusieurs features dans un même module.

Ne pas déplacer l’architecture existante sans expliquer pourquoi.

Respecter l’organisation existante du projet avant de proposer une refactorisation.
