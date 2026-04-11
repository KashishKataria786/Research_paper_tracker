# Research Paper Tracker & Insights Dashboard

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A premium, full-stack management system designed for researchers to organize their personal paper libraries, track reading progress, and visualize citation impact through a high-fidelity analytics dashboard.

---

## 🚀 Key Features

### 🔐 Secure Authentication
- Full user registration and login system.
- Secure session management using **JWT** and **HTTP-only cookies/Local Storage**.
- Protected routes ensuring research data privacy.

### 📚 Research Paper Library
- **Centralized Management**: Add, view, edit, and delete research papers.
- **PDF Integration**: Integrated file handling using **Multer** for direct PDF uploads and viewing.
- **Advanced Metrics**: Track properties like `Impact Score`, `Reading Stage`, and `Citation Count`.

### 🔍 Powerful Filtering Engine
- **Multi-select Categorization**: Filter your library by multiple Research Domains, Reading Stages, and Impact Scores simultaneously.
- **Time-Aware Views**: Filter papers by relative date ranges (This Week, This Month, Last 3 Months).
- **Active Filter Chips**: Interactive tags for instant filter management and "Clear All" capability.

### 📊 Real-time Insights Dashboard
- **Reading Funnel**: Visualize your paper progression from "Abstract Read" to "Fully Analyzed."
- **Citation Analysis**: A correlation scatter plot comparing paper impact scores vs. external citations.
- **Domain Distribution**: Stacked bar charts showing research progress distributed across different scientific fields.
- **KPI Summary**: Quick metrics for Completion Rate, Average Citations, and Library Growth.

### ✨ Premium UX/UI
- Built with **Tailwind CSS 4** for ultra-fast, modern styling.
- Smooth transitions and interactive elements powered by **Framer Motion**.
- Reusable **Animated Modals** for a consistent, professional design system.
- Responsive design optimized for both desktop archives and mobile lookups.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4, Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React, React Icons
- **Notifications**: React Toastify

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (via Mongoose)
- **Storage**: Multer (Local disk storage)
- **Security**: JWT, Bcrypt

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5001
MONGO_DB_URL_CONNECTION_STRING=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```
Run the server:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The application should now be running at `http://localhost:5173`.

---

## 📁 Project Structure

```text
├── backend
│   ├── config          # Database configuration
│   ├── controllers     # Business logic (Auth, Papers, Analytics)
│   ├── middleware      # Auth, Upload, and Error middlewares
│   ├── models          # Mongoose Schemas (User, Paper)
│   ├── routes          # API Endpoints registration
│   └── uploads         # Physical storage for PDF files
├── frontend
│   ├── src
│   │   ├── api         # Centralized API services
│   │   ├── components  # Reusable UI components (Modals, Layouts)
│   │   ├── context     # Auth State management
│   │   ├── pages       # Main view layers (Dashboard, Library, Auth)
│   │   └── utils       # Constants and helper functions
└── README.md
```

---

## 📄 License
Distributed under the ISC License. See `LICENSE` for more information.
