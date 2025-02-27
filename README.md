# 🚴‍♂️ CarStore
# Live Link: https://car-store-frontend-rose.vercel.app/
## 📌 Overview

The **Bicycle Store Application** is an intuitive e-commerce platform designed for seamless bicycle purchases. It features role-based authentication, product management, and secure payments to ensure a smooth and secure user experience.

## ✨ Key Features

### 🔐 Authentication & Security

- Secure user registration & login (name, email, password).
- Passwords are **hashed** before storage.
- **Role-based access** (Customers & Admins).
- **JWT Authentication** for user sessions.
- Logout removes JWT token and redirects to login.

### 🌍 Public Pages

#### 🏠 Home

- **Navbar**: Logo, menu links, login/signup buttons.
- **Hero Banner**: Featured promotions & special offers.
- **Featured Bicycles**: Displays up to 6 products with a "View All" option.
- **Extra Section**: Testimonials & reviews.
- **Footer**: Contact details & social links.

#### 🚲 Bicycles Page

- **Search & Filters**: Search by brand, name, category & price.
- **Dynamic Listings**: Updates based on user input.
- **Detailed Bicycle Cards**: Name, brand, model, price & category.

#### 📄 Bicycle Details Page

- Displays product image, specs, and pricing.
- "Buy Now" button redirects to the checkout page.

#### ℹ️ About Page

- Store mission & brand information.

### 🔒 Private Routes

#### 🛒 Checkout Page

- Users can purchase bicycles securely.
- **Stock Validation**: Orders are limited to available inventory.
- **Order Summary**: Product details, user info, total price, and payment method.
- **Payment Integration**: Supports SurjoPay, Stripe, etc.

#### 📊 Dashboard

- **User Dashboard**: View order history, update profile & change password securely.

---

## 🔧 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Redux, Typescript
- **Backend:** Node.js, Express.js, Typescript
- **Database:** MongoDB
- **Hosting & Deployment:** Vercel
- **Payment Gateway:** Stripe

## 🚀 Installation & Setup

### 🖥 Backend

```sh
cd server
npm install
npm start
```

### 🌐 Frontend

```sh
cd client
npm install
npm start
```

## 🌐 Live Demo



