import { connectToDatabase } from '../config/database';
import { User } from '../types/user';

const COLLECTION_NAME = 'users';

export const findUserByUsername = async (username: string): Promise<User | null> => {
    const db = await connectToDatabase();
    return db.collection<User>(COLLECTION_NAME).findOne({ username });
};

export const createUser = async (user: User): Promise<string> => {
    const db = await connectToDatabase();
    const result = await db.collection<User>(COLLECTION_NAME).insertOne(user);
    return result.insertedId.toString();
};
