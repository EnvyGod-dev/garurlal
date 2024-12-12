import { MongoClient, Db, Collection } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = 'mongodb://localhost:27017/IdontknowWTF';
let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
    if (!db) {
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db();
    }
    return db;
};

export const getCollection = async (collectionName: string): Promise<Collection> => {
    const database = await connectToDatabase();
    return database.collection(collectionName);
};
