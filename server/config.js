import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const connectionString = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME
};

const client = new Client(connectionString);
client.connect();

export default client;
