# LuxuryApp

Luxury est une application web qui combine un backend Ruby on Rails et un frontend Next.js.

## Structure du projet

Le projet est organisé de la manière suivante :

```
Luxury-App/
├── backend/   # Backend Ruby on Rails
└── frontend/  # Frontend Next.js
```

### backend
Ce dossier contient le backend de l'application, construit avec **Ruby on Rails**. Il fournit les API nécessaires pour gérer les données.

#### Prérequis
- Ruby (version 3.3.6)
- Rails (version 8.0.1)
- PostgreSQL

#### Installation et démarrage
1. Rendez-vous dans le dossier `backend` :
   ```bash
   cd backend
   ```
2. Installez les dépendances :
   ```bash
   bundle install
   ```
3. Configurez la base de données :
   ```bash
   rails db:create db:migrate db:seed
   ```
4. Lancez le serveur Rails :
   ```bash
   rails server --port=3030
   ```
5. L'API sera disponible sur `http://localhost:3030`.

### frontend
Ce dossier contient le frontend de l'application, construit avec **Next.js**. Il offre une interface utilisateur moderne et réactive pour interagir avec le backend.

#### Prérequis
- Node.js (version 18.x ou supérieure recommandé)
- npm ou yarn ou pnpm

#### Installation et démarrage
1. Rendez-vous dans le dossier `frontend` :
   ```bash
   cd frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
   ou avec yarn :
   ```bash
   yarn install
   ```
   ou avec pnpm :
   ```bash
   pnpm install
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
   ou avec yarn :
   ```bash
   yarn dev
   ```
   ou avec pnpm :
   ```bash
   pnpm dev
   ```
4. L'application sera disponible sur `http://localhost:3000`.

## Fonctionnalités
- **Gestion des utilisateurs** : inscription, connexion, gestion des listings et des places.
- **Création et gestion des listings** : créer, lire, mettre à jour et filtrer.
- **Création et gestion des places** : créer, lire, mettre à jour.

## Technologies utilisées
- **Backend** : Ruby on Rails
- **Frontend** : Next.js
- **Base de données** : PostgreSQL
- **API** : RESTful API pour la communication entre le frontend et le backend

## Contribution
1. Clonez le projet :
   ```bash
   git clone https://github.com/etheocledk/luxury-app.git
   ```
2. Créez une branche pour votre fonctionnalité :
   ```bash
   git checkout -b nouvelle-fonctionnalite
   ```
3. Faites vos modifications et committez-les :
   ```bash
   git commit -m "Ajout d'une nouvelle fonctionnalité"
   ```
4. Poussez vos modifications :
   ```bash
   git push origin nouvelle-fonctionnalite
   ```
5. Ouvrez une Pull Request.


#### Gestion des mails :
1. Installer maildev pour recevoir les mails de validation de compte
```bash
  npm install -g maildev
   ```
3. Lancez maildev :
   ```bash
   maildev
   ```
4. L'interface web sera disponible sur `http://localhost:1080`.
