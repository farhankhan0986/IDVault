# 🪪 IDVault – Digital Identity Card Platform

**IDVault** is a modern web application that allows users to create, manage, and share a **digital identity card** securely.  
Each user can create **one personal digital card**, edit or delete it, and share a **public link** accessible without login.

🔗 **Live Demo:** https://id-vault.vercel.app  

---

## ✨ Features

### 🔐 Authentication
- Secure JWT-based authentication
- HTTP-only cookies
- Protected routes via middleware
- Login, Signup, Logout

### 🧾 Digital Card Management
- Create a personal digital identity card
- Edit card details
- Delete card
- One card per user (enforced at DB level)

### 🌍 Public Card Sharing
- Unique public shareable URL for every card
- Public pages require **no authentication**
- Safe read-only access

### 🖥 Dashboard
- Authenticated dashboard for users
- Shows card preview
- Click card → full card view
- Edit / Delete actions available only to owner

### 🎨 UI & UX
- Clean, modern UI
- Tailwind CSS styling
- Toast notifications using **Sonner**
- Responsive design

---

## 🛠 Tech Stack

**Frontend**
- Next.js 16 (App Router + Turbopack)
- React
- Tailwind CSS

**Backend**
- Next.js API Routes
- JWT Authentication
- Middleware-based route protection

**Database**
- MongoDB
- Mongoose

**Deployment**
- Vercel

---

## 📁 Project Structure

```
app/
├── api/
│   ├── auth/
│   └── cards/
├── dashboard/
├── card/[id]/
├── create-card/
├── edit-card/
├── login/
├── signup/
├── components/
├── middleware.js
└── layout.js
```

---

## 🔑 Environment Variables

Create a `.env.local` file:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=production
```

---

## 🚀 Getting Started

```
git clone https://github.com/farhankhan0986/IDVault.git
cd IDVault
npm install
npm run dev
```

---

## 📦 Production Build

```
npm run build
npm start
```

---

## 🧪 API Endpoints

**Auth**
- POST `/api/auth/signup`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- GET `/api/auth/me`

**Cards**
- POST `/api/cards/create`
- PUT `/api/cards/update`
- DELETE `/api/cards/delete`
- GET `/api/cards/my`
- GET `/api/cards/public/:id`

---

## 👤 Author

**Farhan Khan**  
GitHub: https://github.com/farhankhan0986

---


