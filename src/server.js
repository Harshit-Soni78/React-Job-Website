import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// In a serverless environment like Vercel, the routing configuration
// (in vercel.json) will strip the `/api` prefix. So, the server
// only needs to handle the path that comes after it (e.g., `/jobs`).
app.use('/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
