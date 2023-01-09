const {createConfigResponse, createConfigRequestDTO} = require("../DTO/Configurations/CreateConfigurationsDTO");
const response = require("./utils/response");
const {createConfiguration, findAllByUser} = require("../Services/ConfigurationsServices");
const ConfigurationsModel = require("../Models/Configurations")();
const UsersModel = require("../Models/Users")();

module.exports = {
    find: async (req, res) => {

    },
    list: async (req, res) => {
        try {
            const user = await UsersModel.findByUsername(req.user.userName);
            return response({ res, data:  await findAllByUser(user.id) });
        } catch (e) {
            return response({res, status: 500, data: { originMessage: e.message }});
        }
    },
    create: async (req, res) => {
        try {
            const {gameName, amountOfMatches, scoreType, players, userId, lastUse, createAt} = req.body;
            const configDTO = createConfigRequestDTO({gameName, amountOfMatches, scoreType, userId, lastUse, createAt});
            const configCreated = await createConfiguration(res, configDTO, players)

            if(!configCreated){
                return response({res, status: 422, data: { message: "Ocorreu um erro ao tentar criar a configuração" } });
            }

            return response({res, status: 201, data: { instance: configCreated } });
        } catch (e) {
            return response({res, status: e.status, data: { message: e.message, originMessage: e.message }});
        }
    },
    update: async (req, res) => {
        //por enquanto sem alterações nas entidades
    },
    destroy: async (req, res) => {
        //por enquanto sem exclusão nas entidades
    }
}