## Formation Cheffe de Projet Multimédia - Option Développement - OpenClassrooms
### Projet n°6 : Création d'un site web de gestion des Systèmes d'échanges locaux

#### Définition d’un Système d’échange local  
Un Système d'échange local (ou Sel) est un système d'échange de produits ou de services au sein d'un groupe fermé, généralement constitué en association. Ses membres échangent des biens et services selon une unité propre à chaque groupe. L’objectif est d'accéder à des échanges égalitaires et de tisser des liens. 

#### Objectifs du projet :  
L’objectif principal du projet est de créer un site web qui facilitera la gestion de systèmes d’échanges locaux. Les utilisateurs devront pouvoir :  
* adhérer/s’inscrire au Sel
* déposer des offres et des demandes
* accepter des offres et des demandes en étant mis en contact avec le membre concerné  

Le site devra être très simple et être accessible à tous pour ne pas bloquer les adhérents qui maîtrisent mal l’outil informatique.

#### Périmètre fonctionnel :  
##### Backend :  
* Publier/modifier/effacer des articles  
* Supprimer des offres et demandes  
* Bloquer un utilisateur  
* Supprimer un compte  

##### Frontend :  
Pour tous les utilisateurs :
* Lire les offres et les demandes  
* Voir les actualités de l’association  
* S’inscrire au SEL  
* Contacter l’association  

Pour les utilisateurs connectés :  
* Lire les offres et les demandes et le membre qui les a publiées
* Ajouter de nouvelles offres et demandes
* Supprimer des offres et demandes en cours
* Renouveler des offres et demandes expirées
* Accéder aux coordonnées des membres qui publient des offres et demandes
* Voir le porte-monnaie
* Réaliser des transactions avec d’autres membres

#### Spécifications techniques :
Frontend : Utilisation du framework nuxtJS  
Traitement et rendu des données : GraphQL et Apollo  
Backend : Utilisation de l'api Strapi
