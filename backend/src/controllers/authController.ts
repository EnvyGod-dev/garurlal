import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    try {
        const userId = await registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const user = await loginUser(req.body.username, req.body.password);
        res.status(200).json({ message: 'Login successful', user });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
