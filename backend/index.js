const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const initdb = require("./routes/initdb");
const serverPort = require("./routes/serverPort");
const raspberryPort = require("./routes/raspberryPort");

const port = 80;

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type, Authorization",
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", serverPort, raspberryPort, initdb);

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Raspberry API",
            version: "1.0.0",
            description: "Server Port API Information",
        },
        servers: [
            {
                url: "http://localhost",
            },
        ],
    },
    apis: ["./routes/*.js", "./models/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
