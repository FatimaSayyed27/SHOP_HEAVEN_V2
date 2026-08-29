# 🛍️ SHOP_HEAVEN

### A Modern Full-Stack Luxury Fashion E-Commerce Platform

SHOP_HEAVEN is a modern full-stack e-commerce platform built for exploring and shopping premium fashion products from curated luxury brands.

The platform provides a smooth shopping experience with secure authentication, product discovery, brand exploration, cart and wishlist functionality, order management, and a dedicated admin dashboard.

---

## 🌐 Live Project

🔗 **Live Website:**  
https://shop-heaven-v2-eta.vercel.app/

🔗 **Backend API:**  
https://shop-heaven-v2.onrender.com/

🔗 **GitHub Repository:**  
https://github.com/FatimaSayyed27/SHOP_HEAVEN_V2

---

## ✨ Features

### 👤 Customer Features

- User registration and login
- JWT-based authentication
- Browse products and luxury brands
- Browse products by categories
- Product search
- Product filtering
- Product sorting
- Detailed product pages
- Brand detail pages
- Add products to cart
- Update cart quantity
- Remove products from cart
- Add products to wishlist
- Remove products from wishlist
- Order placement
- Order history
- Order cancellation
- User profile management
- Responsive design for desktop, tablet, and mobile devices

---

### 🛠️ Admin Features

- Secure admin authentication
- Admin dashboard
- Product management
- Add products
- Update products
- Delete products
- Brand management
- Add brands
- Update brands
- Delete brands
- Category management
- Add categories
- Update categories
- Delete categories
- Order management
- Update order status
- Inventory and stock management
- Revenue overview
- User statistics
- Low-stock product monitoring

---

## 🧰 Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- REST API Integration

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT
- RESTful APIs

### Database

- PostgreSQL

### Image & Media Storage

- Cloudinary

### Development & Deployment

- Git
- GitHub
- Postman
- Vercel
- Render

---

## 🏗️ System Architecture

```text
                   ┌──────────────────────┐
                   │      User / Admin     │
                   └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────────┐
                   │   React + Vite       │
                   │   Tailwind CSS       │
                   │   Frontend           │
                   └──────────┬───────────┘
                              │
                         REST API
                              │
                              ▼
                   ┌──────────────────────┐
                   │ Django REST Framework│
                   │ JWT Authentication   │
                   │ Backend API          │
                   └───────┬───────┬──────┘
                           │       │
                           ▼       ▼
                ┌──────────────┐ ┌──────────────┐
                │ PostgreSQL   │ │  Cloudinary  │
                │   Database   │ │ Image Storage│
                └──────────────┘ └──────────────┘
