const bcrypt = require("bcrypt");

exports.encryptPassword = (password) => bcrypt.hashSync(password, 10);

exports.comparePassword = (passwordParam, password) => !!passwordParam && !!password && bcrypt.compare(passwordParam, password);