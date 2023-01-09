const ConfigurationsController = require("../../Controllers/ConfigurationsController");

const endpoints = [
    { path: "/", method: "get", action: ConfigurationsController.list, requiredAuthenticate: true },
    { path: "/{id}", method: "get",  action: ConfigurationsController.find, requiredAuthenticate: true },
    { path: "/", method: "post",  action: ConfigurationsController.create, requiredAuthenticate: true },
    { path: "/{id}", method: "put",  action: ConfigurationsController.update, requiredAuthenticate: true },
    { path: "/{id}", method: "delete",  action: ConfigurationsController.destroy, requiredAuthenticate: true },
];

module.exports = {
    prefix: "configurations",
    endpoints
}