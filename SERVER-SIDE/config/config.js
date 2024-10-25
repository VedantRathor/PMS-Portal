
require('dotenv').config(); // Ensure you load your .env file

module.exports = {
    development: {
        username: 'root',
        password: 'Vedant@9820',
        database: 'projectmanagementsystem',
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql'
    },
    test: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'database_test',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || '3306',
        dialect: 'mysql'
    },
    production: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'database_production',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || '3306',
        dialect: 'mysql'
    }
};