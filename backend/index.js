require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require("method-override");

// --- Initialize App ---
const app = express();

// --- Database Connection ---
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}
main()
  .then(() => console.log("Database Connection Successful"))
  .catch((err) => console.log(err));

// --- Middleware ---
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
    'http://localhost:5173',
    'https://fair-share-2.vercel.app'
];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// --- Routers ---
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const tripRoutes = require('./routes/trips');
const notificationRoutes = require('./routes/notifications');

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/notifications', notificationRoutes);

// --- Server Listening ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`);
});
