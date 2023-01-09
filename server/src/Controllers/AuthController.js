const UsersModel = require("../Models/Users")();
const { comparePassword, encryptPassword } = require("../Security/encrypt")
const {generateToken} = require("../Security/jwt");
const response = require("./utils/response");

module.exports = {
    login: async (req, res) => {
        try {
            const {username, password} = req.body;
            const user = await UsersModel.findByUsername(username);

            if (!user || !(await comparePassword(password, user.password))) {
                return response({res, status: 401});
            }

            return response({res, data: {user, token: generateToken(username)}});
        } catch (e) {
            return response({res, status: 500});
        }
    },

    register: async (req, res) => {
        try {
            const {username, password} = req.body;

            if (await UsersModel.findByUsername(username)) {
                return response({res, status: 422, data: {message: "Já existe um usuário com esse username"}})
            }

            const userCreated = await UsersModel.create({username, password: encryptPassword(password)})

            if (!userCreated) {
                return response({res, status: 422, data: {message: "Não foi possível criar o usuário"}})
            }

            return response({res, status: 201, data: {user: {username: userCreated.username, id: userCreated.id}}})
        } catch (e) {
            return response({res, status: 500});
        }
    }
}