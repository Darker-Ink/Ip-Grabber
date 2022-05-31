const config = require("./config.json");
const express = require("express");
const loadRoutes = require("./utils/loadRoutes");

const app = express();

app.use((req, res, next) => {
    req.realip = (req.headers["cf-connecting-ip"] || req.headers["x-forwarded-for"] || req.ip).replace(/^::ffff:/, "");
    next();
})

loadRoutes(app);

app.all("*", (req, res) => {
    res.status(404).send("404 Not Found");
})

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})