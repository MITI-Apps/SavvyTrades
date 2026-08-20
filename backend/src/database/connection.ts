import { Sequelize } from "sequelize";
import 'dotenv/config'

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
if (!DB_NAME || !DB_USER || !DB_PASSWORD){
    throw new Error("Missing database configuration credentials")
};
const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 3306,
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
    }
);

export default sequelize;