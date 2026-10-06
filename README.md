# Employee Management System

A complete, production-ready Full Stack Employee Management System built for a developer assignment. This application demonstrates a fully working end-to-end flow from a React frontend through a Node.js REST API to a MongoDB Atlas database.

## Features

* **Full CRUD Operations**: Create, Read, Update, and Delete employees.
* **Search & Filtering**: Search employees by name or email, and filter by department (executed on the backend).
* **Comprehensive Validation**: Robust client-side (React) and server-side (Mongoose/Express) validation.
* **Modern UI/UX**: Professional dark-mode design with responsive layout, glassmorphism elements, and clear feedback (toasts, loading states).
* **Robust Error Handling**: Centralized Express error handling protecting sensitive data.
* **No Mock Data**: 100% data persistence in MongoDB Atlas.

## Tech Stack

* **Frontend**: React, Vite, React Router, Axios, Custom CSS (Vanilla)
* **Backend**: Node.js, Express.js
* **Database**: MongoDB Atlas, Mongoose ODM

## Project Structure

```text
employee-management-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── services/       # API abstraction (axios)
│   │   ├── App.jsx         # Routing setup
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global design system
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node/Express backend
│   ├── config/             # DB connection
│   ├── controllers/        # Business logic
│   ├── middleware/         # Error handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── server.js           # Entry point
│   ├── seed.js             # Data seeder
│   ├── .env.example
│   └── package.json
└── README.md
```

## Local Setup

1. **Clone the repository** (if applicable) and navigate to the root directory.

2. **Backend Setup**:
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory based on `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   CLIENT_URL=http://localhost:5173
   ```
   *Optional: Seed the database with sample data:*
   ```bash
   npm run seed
   ```
   *Start the backend server:*
   ```bash
   npm run dev
   ```

3. **Frontend Setup**:
   Open a new terminal.
   ```bash
   cd client
   npm install
   ```
   Create a `.env` file in the `client` directory based on `.env.example`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   *Start the frontend development server:*
   ```bash
   npm run dev
   ```

4. **Access the application**: Open your browser and navigate to `http://localhost:5173`.

## API Endpoints

* `GET /api/health` - Check API status
* `GET /api/employees` - Get all employees (supports `?search=` and `?department=`)
* `GET /api/employees/:id` - Get a single employee
* `POST /api/employees` - Create a new employee
* `PUT /api/employees/:id` - Update an employee
* `DELETE /api/employees/:id` - Delete an employee

## Deployment

**Frontend (e.g., Vercel)**
* **Build Command**: `npm run build`
* **Output Directory**: `dist`
* **Environment Variables**: Set `VITE_API_URL` to your deployed backend URL.

**Backend (e.g., Render)**
* **Start Command**: `npm start`
* **Environment Variables**: Set `MONGODB_URI`, `PORT`, and `CLIENT_URL` (to your deployed frontend URL for CORS).
