# Pecunia

**Pecunia** est une application web de gestion de budget personnel permettant 
de suivre et analyser les dépenses et les revenus à travers une interface moderne et une API REST.


## Nom du projet
Pecunia est un mot latin qui signifie argent, symbolisant la gestion financière personnelle.


## Fonctionnalités
- Ajout de transactions (revenus / dépenses)
- Consultation de la liste des transactions
- Suppression des transactions
- Calcul automatique :
  - du solde
  - des revenus
  - des dépenses
- Interface moderne, responsive et intuitive


## Technologies utilisées

### Frontend
- Next.js (React)
- DaisyUI pour le UI
- Lucide-react pour les icônes
- Axios pour les appels API

### Backend
- Django
- Django REST Framework
  - Model : Transaction (id, description, montant, date_creation)
  - API CRUD pour ajouter, supprimer et consulter.
- Base de données SQLite


## Architecture
- Frontend et Backend séparés
- Communication via API REST (JSON)
- Architecture basée sur les bonnes pratiques Django & React


## Lancer le projet

### Backend

Il faut se mettre dans le dossier backend et exécuter ces commandes:

python -m venv env

env\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver

## Frontend

Il faut se mettre dans le dossier backend et exécuter ces commandes:

npm install

npm run dev


# Auteur

Anis Abdat

étudiant en Informatique
