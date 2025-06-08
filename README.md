# 🧴 Cosmetic Store

Ce projet est une application de boutique de maquillage développée avec **Laravel** (backend API) et **React** (frontend) utilisant **JWT** pour l’authentification, **Tailwind CSS** pour le design, et **Redux Toolkit** pour la gestion d’état.

---

## 🚀 Fonctionnalités

- 🔐 Authentification avec JWT (Inscription, Connexion)
- 🛍️ Affichage des produits
- ❤️ Ajouter aux favoris
- 🛒 Gestion du panier
- 📦 Passer une commande
- 🧑‍💼 Gestion du profil client
- 📄 Historique des commandes

---

## ⚙️ Technologies utilisées

### Frontend (React + Vite)
- React 19
- React Router DOM 7
- Redux Toolkit
- Tailwind CSS
- Axios
- React Toastify
- Slick Carousel

### Backend (Laravel 12)
- Laravel Sanctum / JWT Auth
- Laravel Breeze
- MySQL
- Eloquent ORM

---

## 🛠️ Installation

### ✅ Cloner le projet

```bash
git clone https://github.com/Fatyma200730/cosmetic.git
cd cosmetic

1/Backend Laravel:
cd makeup-store-backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve

cd makeup-store-frontend
npm install
npm run dev

