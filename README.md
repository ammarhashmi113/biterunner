## ⚠️ Backend Hosting Status

The backend APIs are currently offline due to free-tier limits on Render. You can still:

- Explore the fully functional frontend hosted on Vercel
- Review all backend logic, routes, and authentication in the `backend/` folder
- Run the fullstack app locally by following the instructions below

This is a temporary issue and will be resolved once stable hosting is arranged.

---

# 🍔 Biterunner

**Live Frontend Demo:**: [biterunner.vercel.app](https://biterunner.vercel.app/)

**Biterunner** is a full-stack restaurant web app with an online ordering system. It supports both customer and admin roles, with features like browsing menu items, managing orders, handling cart and checkout, and maintaining secure user authentication.

---

## ⚙️ Tech Stack

-   **Frontend**: React + Vite + React Router
-   **Backend**: Node.js + Express
-   **Database**: MongoDB (Local for dev, will use Atlas for production)
-   **Auth**: JWT + Role-based Access (User/Admin)
-   **Image Uploads**: Cloudinary
-   **UI/UX**: TailwindCSS + React Hot Toast
-   **Deployment**:
    -   Frontend: [Vercel](https://biterunner.vercel.app/)
    -   Backend (Currently offline because of free-tier limits): [Render](https://campverse-booking-app.onrender.com/)

---

## 🧩 Project Structure

```
biterunner/
├── frontend/
│   └── src/
│       ├── components/       # Shared and role-specific components
│       ├── contexts/         # Global state (User, Cart)
│       ├── pages/            # Route-based pages
│       ├── utils/            # Axios config, auth helpers
│       ├── App.jsx           # Main app with routes and guards
│       └── main.jsx
├── backend/
│   ├── routes/               # Modular route files
│   ├── models/               # Mongoose schemas
│   ├── middlewares/         # Auth, validation, error handling
│   ├── utils/                # Custom utilities (AppError, catchAsync, etc.)
│   └── app.js
```

---

## ✨ Features

### 🧑 Users

-   Register, login, and persist sessions via JWT
-   Browse menu items by category
-   Add items to cart, checkout, and view order history
-   Update profile and change password

### 👨‍🍳 Admins

-   Add, edit, and delete menu categories and items (with Cloudinary image management)
-   Manage all user orders and update their status
-   Access admin-only dashboard and protected routes

---

## 🔐 Route Protection

-   `RequireUser` for checkout, my orders, etc.
-   `RequireAdmin` for order/menu management
-   `RestrictAdmin` prevents admins from accessing user-only routes like cart

---

## 📦 API Overview

### Auth (`/api/auth`)

-   `POST /register`, `POST /login`, `POST /change-password`
-   `GET /me`, `PATCH /me`

### Menu (`/api/menu`)

-   CRUD on categories and items (admin only for write routes)

### Orders (`/api/orders`)

-   Users can create/view their orders
-   Admins can view/update all orders

---

## 🌐 Environment Variables

### Backend (`backend/.env`)

```
MONGO_URI=mongodb://127.0.0.1:27017/biterunner
PORT=3000
JWT_SECRET=your-secret
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Frontend (`frontend/.env`)

```
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 🛠️ Local Development

### 1. Clone the Repo

```bash
git clone https://github.com/ammarhashmi113/biterunner.git
cd biterunner
```

### 2. Install and Run Backend

```bash
cd backend
npm install
node app.js
```

### 3. Install and Run Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Your app will now be running at:

-   Frontend: [http://localhost:5173](http://localhost:5173)
-   Backend: [http://localhost:3000](http://localhost:3000)

---

## 🧠 Future Ideas

-   Payment integration
-   Role-specific dashboards
-   Better error UI & fallback routes
-   Unit + integration testing

---

## 📄 License

MIT License

---

## ✍️ Author

Made with passion by [Ammar Hashmi](https://github.com/ammarhashmi113)
