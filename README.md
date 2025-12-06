# WorkerHub - Worker Marketplace Platform

A comprehensive worker marketplace application built with React and Node.js, featuring booking system, user authentication, worker profiles, and review functionality.

## Features

- 🔐 User Authentication (Login/Signup)
- 👷 Worker Profiles with detailed information
- 📅 Booking System with status management
- ⭐ Review and Rating System
- 💬 Real-time Chat between workers and employers
- 🤖 AI-powered Worker Recommendations
- ❤️ Favorites System
- 🔍 Advanced Search and Filtering
- 📊 User Dashboard with statistics
- 🎨 Modern UI with white and blue theme

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend/frontend_ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints

### Users
- POST `/api/users/signup` - Register new user
- POST `/api/users/login` - User login
- GET `/api/users/profile` - Get user profile

### Workers
- GET `/api/workers` - Get all workers
- GET `/api/workers/:id` - Get worker by ID
- PUT `/api/workers/:id` - Update worker profile

### Bookings
- POST `/api/bookings` - Create new booking
- GET `/api/bookings/user` - Get user bookings
- GET `/api/bookings/worker` - Get worker bookings
- PUT `/api/bookings/:id` - Update booking status

### Reviews
- POST `/api/reviews` - Create review
- GET `/api/reviews/worker/:workerId` - Get worker reviews

## Project Structure

```
work_backend/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   └── frontend_ui/
│       ├── public/
│       └── src/
│           ├── api/
│           ├── components/
│           ├── context/
│           ├── pages/
│           └── styles/
└── README.md
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
