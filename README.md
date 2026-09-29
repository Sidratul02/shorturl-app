# URL Shortener

A full-stack URL shortener with QR code generation built with React, Node.js, Express, and MongoDB.

## Features

- Shorten long URLs into compact links
- QR code generation for shortened URLs
- Download QR code as PNG
- Copy shortened URL to clipboard
- Click tracking

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, DaisyUI, Axios  
**Backend:** Node.js, Express, MongoDB, Mongoose, Nanoid

## Project Structure

```
url shortner/
├── frontend/        # React + Vite app
└── backend/         # Express + MongoDB API
```

## Setup

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Backend

1. Navigate to the backend folder:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following:
   ```
   MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase
   PORT=5000
   BASE_URL=http://localhost:5000
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend

1. Navigate to the frontend folder:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file:
   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. Start the frontend:
   ```
   npm run dev
   ```

## Usage

1. Make sure the backend server is running on port 5000
2. Open the frontend at `http://localhost:5173`
3. Paste or type a long URL into the input field
4. Click **Shorten**
5. Copy the short link or scan/download the QR code

## API Endpoints

| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| POST   | `/shorten`    | Shorten a URL            |
| GET    | `/:shortId`   | Redirect to original URL |
