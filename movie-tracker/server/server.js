import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';
import watchedRoutes from './routes/watchedRoutes.js';
import bcrypt from 'bcryptjs';
import User from './models/User.js';      
import seedMoviesOnStartup from './seedMovies.js';


const createAdminUser = async () => {
    const adminExists = await User.findOne({ username: 'admin' });

    if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10);

        await User.create({
            username: 'admin',
            passwordHash: hashedPassword,
            role: 'admin'
        });

        console.log('Admin user created');
    } else {
        console.log('Admin already exists');
    }
};

dotenv.config();

connectDB();

createAdminUser();

await seedMoviesOnStartup();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.json({ message: 'Movie Tracker API running' }));
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/watched', watchedRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
