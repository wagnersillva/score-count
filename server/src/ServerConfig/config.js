const express = require("express");
const cors = require ('cors');
const routes = require("../Routes");

const ExpressConfig = {
    middlewares: [
        cors(),
        express.urlencoded({ extended: true }),
        express.json()
    ],
    settings: [
        { key: 'port' , value: process.env.PORT || 8000 || 8080 || 8888 }
    ],
    routes,
    app: express()
};

module.exports = ExpressConfig