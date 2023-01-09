const { Router } = require('express');
const AuthRoutes = require('./Auth');
const ConfigurationsRoutes = require('./Configurations');
const {verifyAuth} = require("../Middlewares/Login");

const routes = Router();

const getURL = (mapping, endpoint) => `/${mapping.prefix}${endpoint.path}`;

const mappings = [
    AuthRoutes,
    ConfigurationsRoutes
];

mappings.forEach( mapping => {
    mapping.endpoints.forEach( endpoint => {
        if(endpoint.requiredAuthenticate){
            routes[endpoint.method](getURL(mapping, endpoint), verifyAuth, endpoint.action);
        } else {
            routes[endpoint.method](getURL(mapping, endpoint), endpoint.action);
        }
    })
});

module.exports = routes;