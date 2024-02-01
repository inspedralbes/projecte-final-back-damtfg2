require('dotenv').config();

const env = process.env;
const fs = require('fs');
const db = {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME || 'a22osczapmar_puzzleGame'
};

module.exports = db;