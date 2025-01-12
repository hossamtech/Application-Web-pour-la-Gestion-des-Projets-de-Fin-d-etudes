To make the images medium-sized in your `README.md`, you can control the display size using HTML tags since Markdown syntax doesn't natively support resizing images.

Here's the updated `README.md` with medium-sized images:

---

# Gestion des Projets de Fin d’Études (PFE)

## Description du Projet

Ce projet vise à développer une **application web** permettant de gérer les Projets de Fin d’Études (PFE). Elle offre un ensemble d'outils pour simplifier la gestion des documents, la communication entre encadrants et étudiants, ainsi que la planification des soutenances.

---

## Fonctionnalités

- **Gestion des Utilisateurs** :
  - Inscription des étudiants et des encadrants via une interface conviviale.
  - Authentification sécurisée.
  - Gestion des profils et des accès.

- **Gestion des Projets** :
  - Création et suivi des sujets de PFE par les encadrants.
  - Affichage des projets disponibles pour les étudiants.
  - Suivi des demandes et validations.

- **Planification des Soutenances** :
  - Prise de rendez-vous entre étudiants et encadrants.
  - Invitations pour les jurys.
  - Gestion des soutenances (notes, remarques, etc.).

---

## Captures d’Écran

### **Page de Connexion**
<img src="/screenschot_app/login.jpg" alt="Page de Connexion" width="400"/>

### **Inscription**
- **Étudiants** :  
  <img src="/screenschot_app/register-etudiant.jpg" alt="Inscription Étudiant" width="400"/>  
- **Encadrants** :  
  <img src="/screenschot_app/register-encadrant.jpg" alt="Inscription Encadrant" width="400"/>

### **Page d’Accueil Étudiant**
<img src="/screenschot_app/home-etudiant.jpg" alt="Accueil Étudiant" width="400"/>

### **Création de Projet**
<img src="/screenschot_app/create-projects.jpg" alt="Création de Projet" width="400"/>

### **Liste des Projets**
<img src="/screenschot_app/list-projects.jpg" alt="Liste des Projets" width="400"/>

### **Vue d’Ensemble d’un Projet**
<img src="/screenschot_app/overview-project.jpg" alt="Vue d’Ensemble" width="400"/>

### **Demandes de Projets**
<img src="/screenschot_app/project-request.jpg" alt="Demandes de Projets" width="400"/>

### **Demandes en Attente**
<img src="/screenschot_app/requests.jpg" alt="Demandes en Attente" width="400"/>

### **Planification de Rendez-vous**
- **Étudiants** :  
  <img src="/screenschot_app/appointments-students.jpg" alt="Planification Étudiant" width="400"/>  
- **Encadrants** :  
  <img src="/screenschot_app/appointments-encadrant.jpg" alt="Planification Encadrant" width="400"/>

### **Invitations pour le Jury**
<img src="/screenschot_app/invite-jury.jpg" alt="Invitations Jury" width="400"/>

---

## Technologies Utilisées

- **Backend** : Spring Boot
- **Frontend** : React, Angular ou Vue.js
- **Base de Données** : MySQL ou MongoDB

---

## Installation

1. Clonez le projet :
   ```bash
   git clone https://github.com/votre-utilisateur/votre-projet.git
   cd votre-projet
   ```

2. Configurez votre base de données :
   - Créez une base de données et configurez les accès dans le fichier `application.properties`.

3. Installez les dépendances et démarrez les serveurs :
   ```bash
   cd backend
   mvn spring-boot:run
   ```

   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Accédez à l'application sur `http://localhost:3000`.

---

## Contributeurs

- [Votre Nom](https://github.com/votre-utilisateur)
- [Collaborateur 1](https://github.com/collaborateur1)

---

Dans cet exemple, les images sont définies avec une largeur de 400 pixels grâce à `width="400"`. Vous pouvez ajuster la taille en modifiant cette valeur selon vos besoins. 😊
