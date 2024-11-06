const express = require('express');
const app = express();
const port = "3000";

const portRouter = require('./routes/port');
const macadressRouter = require('./routes/macadress');
const mysql = require('mysql');

app.use(express.json());

//TODO: add db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'archi',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to the database');
});

app.use("/api", portRouter, macadressRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});