// 



// app.js
import sequelize from './config/db.config.js';
import User from './models/User.js';  // Ensure you import all models
import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import lobbyRoutes from './routes/lobby.routes.js';
import sportRoutes from './routes/sportRoutes.js';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import { verifyJwtToken } from './middleware/verify.js';
dotenv.config(); // Load environment variables from a .env file into process.env

const app = express();

// Middleware
app.use(express.json());// Parse JSON request bodies
app.use(cookieParser());  

// Routes
app.use('/api/users', userRoutes);
app.use('/api/lobbies', lobbyRoutes);
app.use('/api/sports', sportRoutes);

// Start server
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 2000, // Adjust as per your application's needs
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Middleware to add MySQL pool to each request
app.use((req, res, next) => {
    req.mysql = pool; // Attach pool to req object
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World');
    res.end();
});

// Sync all models
sequelize.sync()
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.log('Error: ' + err));

export default app;
