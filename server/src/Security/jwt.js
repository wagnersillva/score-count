const jwt = require("jsonwebtoken");

const JWT_KEY = '12lk31o3k12j3n1j23nk1j2n31lj2dfq2'

exports.generateToken = (userName) => jwt.sign({ userName}, JWT_KEY);
exports.verifyToken = (token) => jwt.verify(token, JWT_KEY);