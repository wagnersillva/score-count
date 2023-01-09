const AuthController = require("../../Controllers/AuthController");

const endpoints = [
    { path: "/login", method: "post", action: AuthController.login },
    { path: "/register", method: "post",  action: AuthController.register },
]

module.exports = {
    prefix: "auth",
    endpoints
}