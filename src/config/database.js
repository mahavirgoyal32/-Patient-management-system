import dotenv from 'dotenv';

dotenv.config();
const DB_NAME = process.env.DB_NAME || 'patient_managment';
export const config = {
  local: {
    username: process.env.DB_MYSQL_USER ?? 'root',
    password: process.env.DB_MYSQL_PASS ?? '',
    database: process.env.DB_NAME ?? DB_NAME,
    host: process.env.DB_MYSQL_HOST ?? '127.0.0.1',
    port: process.env.DB_MYSQL_PORT ?? '3306',
    seederStorage: 'sequelize',
    dialect: 'mysql',
    logging: false,
  },
  dev: {
    username: process.env.DB_MYSQL_USER ?? 'root',
    password: process.env.DB_MYSQL_PASS ?? 'root',
    database: process.env.DB_NAME ?? DB_NAME,
    host: process.env.DB_MYSQL_HOST ?? '127.0.0.1',
    port: process.env.DB_MYSQL_PORT ?? '3306',
    seederStorage: 'sequelize',
    dialect: 'mysql',
    logging: false,
  },
};

export default config[process.env.ENV];
