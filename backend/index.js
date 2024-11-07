const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const sequelize = require("./database");
const serverPort = require("./routes/serverPort");
const raspberryPort = require("./routes/raspberryPort");
const port = 3000;

app.use(bodyParser.json());
app.use("/api", serverPort, raspberryPort);

sequelize
    .sync()
    .then(() => {
        console.log("Database & tables created!");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
