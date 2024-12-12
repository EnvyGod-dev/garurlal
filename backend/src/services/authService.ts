import { findUserByUsername, createUser } from '../models/userModel';
import bcrypt from 'bcrypt';
import { User } from '../types/user';

export const registerUser = async (user: User): Promise<string> => {
    const existingUser = await findUserByUsername(user.username);
    if (existingUser) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    return createUser(user);
};

export const loginUser = async (username: string, password: string): Promise<User | null> => {
    const user = await findUserByUsername(username);
    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
};
