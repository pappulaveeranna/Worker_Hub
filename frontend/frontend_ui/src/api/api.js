// src/api.js
import axios from "axios";

// -----------------------------
// 🔗 Backend base URL
// -----------------------------
//
// In production (Render/Netlify), set:
//   REACT_APP_API_URL = https://worker-hub-backend.onrender.com/api
//
// If that env variable is NOT set, it will fall back to the hard-coded URL below.

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://worker-hub-backend.onrender.com/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// -----------------------------
// 🔐 Attach JWT token if present
// -----------------------------
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// -----------------------------
// 👤 Auth APIs
// -----------------------------
export const authApi = {
  login: (data) => API.post("/users/login", data),
  signup: (data) => API.post("/users/signup", data),
  workerSignup: (data) => API.post("/workers/signup", data),
};

// -----------------------------
// 🧑‍🔧 Worker APIs
// -----------------------------
export const workerAPI = {
  // GET /api/workers
  getAllWorkers: (params) => API.get("/workers", { params }),

  // GET /api/workers/:id
  getById: (id) => API.get(`/workers/${id}`),
};

// -----------------------------
// 📅 Booking APIs
// -----------------------------
export const bookingAPI = {
  // POST /api/bookings
  create: (data) => API.post("/bookings", data),

  // GET /api/bookings (for logged-in user)
  getUserBookings: () => API.get("/bookings"),

  // PUT /api/bookings/:id/status -> cancelled
  cancelBooking: (id) =>
    API.put(`/bookings/${id}/status`, { status: "cancelled" }),

  // PUT /api/bookings/:id/status -> custom status
  updateStatus: (id, status) =>
    API.put(`/bookings/${id}/status`, { status }),
};

// -----------------------------
// ⭐ Review APIs
// -----------------------------
export const reviewAPI = {
  // POST /api/reviews
  createReview: (data) => API.post("/reviews", data),

  // GET /api/reviews/worker/:workerId
  getWorkerReviews: (workerId) => API.get(`/reviews/worker/${workerId}`),
};

export default API;
