# Real-Time Productivity Management System

Full stack MERN + Redux application for task management, dynamic prioritization, real-time updates, and user-specific productivity insights.

## Tech Stack

- Frontend: React + Vite + Redux Toolkit
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Realtime: Socket.io
- Auth: JWT

## Folder Structure

```text
New project/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
      app.js
      server.js
      socket.js
    .env.example
    package.json
  frontend/
    src/
      app/
      components/
      features/
      pages/
      services/
      App.jsx
      index.css
      main.jsx
      socket.js
    .env.example
    package.json
    vite.config.js
  package.json
```

## Local Setup

### 1. Backend env

Copy `backend/.env.example` to `backend/.env` and fill in:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

### 2. Frontend env

Copy `frontend/.env.example` to `frontend/.env`:

```env
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

### 3. Install

```bash
npm run install:all
```

### 4. Run

Open two terminals:

```bash
npm run dev:backend
```

```bash
npm run dev:frontend
```

## Deployment

### Backend on Render

1. Create a new Web Service from the `backend` folder.
2. Add env vars from `backend/.env.example`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Allow your frontend domain in `CLIENT_URL`.

### Frontend on Vercel

1. Import the `frontend` folder.
2. Add:
   - `VITE_API_URL=https://your-render-backend-url/api`
   - `VITE_SOCKET_URL=https://your-render-backend-url`
3. Build command: `npm run build`
4. Output directory: `dist`

## Submission Checklist

- Deploy backend first
- Update frontend env with live backend URL
- Deploy frontend
- Push both folders to GitHub
- Record a 2-5 minute demo covering auth, task CRUD, priority sorting, realtime sync, and dashboard insights

