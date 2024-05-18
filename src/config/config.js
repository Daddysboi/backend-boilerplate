import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const NODE_ENV = process.env.NODE_ENV;

export { PORT, MONGODB_URL, NODE_ENV };
