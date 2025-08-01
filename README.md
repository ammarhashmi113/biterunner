
# 🍔 Biterunner

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?logo=vercel)](https://biterunner.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tech Stack](https://img.shields.io/badge/stack-MERN-blue)](#-tech-stack)

![Biterunner Screenshot](https://raw.githubusercontent.com/ammarhashmi113/biterunner/refs/heads/main/frontend/public/og-image.png)
<!-- > **Note**: Backend APIs are currently offline due to Render's free-tier limits. You can still explore the frontend and run the full-stack app locally. -->
---

## 🔥 Overview

**Biterunner** is a full-stack restaurant web application built for small restaurant owners, food startups, or solo chefs looking to manage their own online ordering system. Think Domino's-style—customers can place orders directly with the restaurant without relying on third-party platforms like Foodpanda or Uber Eats.

<a href="https://biterunner.vercel.app">
  <img src="https://raw.githubusercontent.com/ammarhashmi113/biterunner/refs/heads/main/frontend/public/android-chrome-512x512.png" alt="Biterunner logo" align="right" height="90" />
</a>

![Technologies Used](https://skillicons.dev/icons?i=react,nodejs,express,mongodb,tailwind,vercel,js)

### 👤 Customer Features
- Browse menu by category
- View dish details in modals
- Add to cart and checkout
- Place and track orders
- Manage account (register, login, change password)

### 🛠️ Admin Features
- Add/update/delete categories & menu items
- Manage all customer orders
- Secure admin panel access with JWT + role-based auth

---

## ⚙️ Tech Stack

- **Frontend**: React + Vite + React Router
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Auth**: JWT with role-based access
- **State Management**: React Context + localStorage
- **Image Uploads**: Cloudinary
- **UI/UX**: TailwindCSS + Lucide Icons + React Hot Toast
- **Hosting**:
  - Frontend: [Vercel](https://biterunner.vercel.app)
  - Backend: Render (currently offline)

---

## 🚀 Live Demo

> 🖥️ [Click here to try Biterunner](https://biterunner.vercel.app)

- Admin login available on request for recruiters 🧑‍💼

---

## 📸 Screenshots

| Homepage | Menu Page |
|---------|-----------|
| ![Homepage](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/home-page.webp) | ![Menu Page](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/menu-page.webp) |

### Food Ordering

| Cart Sidebar | Cart Page |
|------------|------------------|
| ![Cart Sidebar](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/cart-sidebar.png) | ![Cart Page](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/cart-page.png) |

| Checkout Page | Order Confirmation Page |
|------------|------------------|
| ![Checkout Page](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/checkout-page.png) | ![Order Confirmation Page](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/order-confirmation-page.png) |

### Admin Pages

| Admin Dashboard | Admin Menu Management | Admin Orders Management |
|------------|------------------|----------------|
| ![Admin Dashboard](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/admin-dashboard-page.png) | ![Menu Management](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/admin-menu-management-page.webp) | ![Orders Management](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/admin-order-management-page.png) |

### Admin CRUD

| Add Menu Item | Edit Menu Item |
|---------------|----------------|
| ![Add Menu Item](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/admin-menu-item-add-modal.png) | ![Edit Menu Item](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/admin-menu-item-add-modal.png) |

| Add Menu Category | Edit Menu Category |
|-------------------|--------------------|
| ![Add Menu Category](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/admin-menu-category-add-modal.png) | ![Edit Menu Category](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/admin-menu-category-edit-modal.png) |

### Auth + Order History

| Login | Register | My Orders |
|------------|------------------|----------------|
| ![Login Page](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/login-page.png) | ![Register Page](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/register-page.png) | ![My Orders](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/my-orders-page.png) |

| Profile Page | Profile Edit | Change Password |
|------------|------------------|----------------|
| ![Profile Page](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/my-profile-page.png) | ![Profile Edit Page](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/my-profile-edit-page.png) | ![Change Password Page](https://raw.githubusercontent.com/ammarhashmi113/biterunner/main/frontend/public/screenshots/change-password-page.png) |

---

## 🧑‍💻 Run Locally

### 🔧 Prerequisites
- Node.js >= 18
- MongoDB (running locally or Atlas URI)

### 📦 Installation
```bash
# Clone the repo
git clone https://github.com/ammarhashmi113/biterunner.git
cd biterunner

# Install backend dependencies
cd backend
npm install

# Create a `.env` file in backend/
# Example:
PORT=3000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Run the backend
node app.js

# Open a new terminal and install frontend dependencies
cd ../frontend
npm install

# Run the frontend
npm run dev
```

Visit: `http://localhost:5173`

---

## 📂 Project Structure
```
biterunner/
├── backend/        # Express API
├── frontend/       # React client
└── README.md
```

---

## 💡 Future Improvements
- Payment gateway integration
- Order tracking with delivery ETA
- Email notifications
- Better admin analytics

---

## 📬 Feedback & Contributions

Found a bug or want to suggest a feature?

- ⭐ Star the repo if you like the project!
- 📢 [Create an issue](https://github.com/ammarhashmi113/biterunner/issues)
- 🤝 Pull requests are welcome

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Made with ❤️ by [Ammar Hashmi](https://github.com/ammarhashmi113)
