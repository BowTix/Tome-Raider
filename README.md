# TOME RAIDER

**Tome Raider** est une application d'exploration littéraire au design **Cyberpunk / Brutalist**. Elle permet de naviguer dans la vaste base de données d'OpenLibrary avec une interface immersive, futuriste et réactive.

---

## Fonctionnalités

### Recherche & Navigation
- **Recherche Globale (Quick Search)** : Accessible depuis la navbar et la page d'accueil pour des requêtes rapides.
- **Recherche Avancée** : Formulaire dédié pour filtrer par titre, auteur et genre.
- **Flux en Direct** : Affichage des modifications récentes de la base de données OpenLibrary sur la page d'accueil.

### Fiches Détaillées
- **Données Complètes** : Titre, Auteur, Date de publication, Langue, Sujets.
- **Enrichissement Wikipedia** : Récupération automatique d'extraits et d'images depuis Wikipedia si disponibles.
- **Design "Classified"** : Présentation des données sous forme de fiche technique futuriste.

---

## Stack Technique

- **Core** : [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool** : [Vite](https://vitejs.dev/)
- **Styling** : [Tailwind CSS v4](https://tailwindcss.com/) (avec configuration personnalisée pour le thème).
- **Routing** : [React Router v7](https://reactrouter.com/)
- **APIs** :
  - [OpenLibrary API](https://openlibrary.org/developers/api) (Données livres)
  - [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) (Enrichissement)

---

## Installation & Démarrage

Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé.

1. **Cloner le projet**
   ```bash
   git clone https://github.com/BowTix/Tome-Raider.git
   cd tome-raider
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Accéder à l'application**
   Ouvrez votre navigateur sur `http://localhost:5173`