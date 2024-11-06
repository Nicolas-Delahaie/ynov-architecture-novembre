const express = require('express');
const app = express();
const sequelize = require('./database');
const port = "3000";

const portRouter = require('./routes/port');
const macadressRouter = require('./routes/macadress');

app.use("/api", portRouter, macadressRouter);

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });