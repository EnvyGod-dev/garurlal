import express from 'express';
import path from 'path';
import cors from 'cors'; // Import cors
import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.use('/api/auth', authRoutes);

export default app;
