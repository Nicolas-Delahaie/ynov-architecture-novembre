const express = require('express');
const app = express();
const port = 3000;

const portRouter = require('./routes/port');
const macadressRouter = require('./routes/macadress');

app.use(express.json());

//TODO: add db connection

app.use("/api", portRouter, macadressRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});