const response = require("../Controllers/utils/response");
const handleError = require("../Controllers/utils/handleError");
const {createConfigResponseDTO, createSimpleConfigResponseDTO} = require("../DTO/Configurations/CreateConfigurationsDTO");
const ConfigurationsModel = require("../Models/Configurations")();
const ConfigurationsPlayersModel = require("../Models/PlayersConfig")();


async function findAllByUser(userId){
    const listConfigurations = await ConfigurationsModel.findAll({ user_id: userId });
    return listConfigurations?.map( config => createSimpleConfigResponseDTO(config));
}

async function validateConfig(configDTO){
    const configByName = await ConfigurationsModel.findByNameAndUserId(configDTO.name, configDTO.user_id);
    let valid = false;
    let message = "";

    if(!!configByName){
        message = "Já existe uma configuração com esse nome"
    } else {
        valid = true;
    }

    return {
        valid,
        message
    };
}

async function createConfiguration(res, configDTO, players){
    const configValidate = await validateConfig(configDTO);

    if(!configValidate.valid){
        handleError(422, configValidate.message);
    }

    const create = await ConfigurationsModel.create(configDTO);
    const configCreatedId = create[0];

    if (!configCreatedId) {
        handleError(422, "Ocorreu um erro ao tentar registrar configuração.");
    }

    const createPlayersSucess = await createPlayersForConfig(configCreatedId, players);

    if(!createPlayersSucess.hasError){
        return createConfigResponseDTO(await ConfigurationsModel.find({id: configCreatedId}));
    } else {
        handleError(422, "Ocorreu um erro ao tentar registrar os players da configuração.");
    }
}

async function createPlayersForConfig(configId, players){
    const errors = [];
    const playersCreated = []
    players.forEach( player => {
        const playerBody = {
            configuration_id: configId,
            name: player.name
        }
        const playerCreatedId = ConfigurationsPlayersModel.create(playerBody);

        playersCreated.push(playerBody);
        errors.push(!playerCreatedId);
    });

    return {
        hasError: errors.every( e => !!e),
        playersCreated
    };
}

module.exports = {
    createConfiguration,
    findAllByUser
}