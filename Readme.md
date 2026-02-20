Expense Tracker – Full Stack MERN Application

A modern full-stack Expense Tracker built using the MERN stack with secure JWT authentication, protected routes, analytics dashboard, and a clean dark theme UI.

This project demonstrates production-level backend structure, secure authentication flow, MongoDB aggregation usage, and clean frontend state architecture.

🚀 Tech Stack

Frontend

React (Vite)

Tailwind CSS

React Router DOM

Axios

Context API (Authentication)

JWT Decode

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

Bcrypt

🔐 Features

Authentication

User Registration

User Login

JWT-based authentication

Protected routes

Persistent login (refresh safe)

Dynamic navbar (Login/Register/Logout based on auth state)

Transactions

Create transaction (Income / Expense)

Delete transaction

User-specific data isolation

Instant UI updates without manual refresh

Dashboard Analytics

Total Income

Total Expense

Net Balance

Category breakdown

Monthly income vs expense summary

UI

Modern black SaaS-style theme

Responsive layout

Card-based dashboard

Clean minimal interface

📁 Project Structure

client

api

component

context

pages

App.jsx

main.jsx

server

config

controllers

models

routes

middleware

server.js

⚙️ Environment Variables

Create a .env file inside the backend folder with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

🛠️ Installation

Backend Setup

cd server
npm install
npm run dev

Frontend Setup

cd client
npm install
npm run dev

🌍 API Endpoints

Authentication

POST /api/auth/register
POST /api/auth/login

Transactions

GET /api/transaction
POST /api/transaction
DELETE /api/transaction/:id
GET /api/transaction/summary
GET /api/transaction/category
GET /api/transaction/monthly

🧠 Key Concepts Implemented

JWT Authentication Flow

Middleware-based Route Protection

MongoDB Aggregation Pipelines

Parent-controlled React state architecture

Axios interceptors

Dynamic UI rendering based on authentication

Clean component separation

🎯 Learning Focus

This project emphasizes:

Secure backend API design

Clean full-stack architecture

Proper state management

Scalable component structure

Production-ready project organization

🚀 Future Improvements

Add charts (Recharts / Chart.js)

Edit transaction feature

Pagination & filtering

Search functionality

Profile management

Cloud deployment (Render + Vercel)

📜 License

Built for learning and portfolio demonstration purposes.