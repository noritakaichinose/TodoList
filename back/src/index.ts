import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import connectDB from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['https://todo-list-ebon-iota-65.vercel.app/'],
  methods: ['POST', 'GET', 'PUT', 'DELETE']
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api', todoRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});