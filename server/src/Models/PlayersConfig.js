const ModelBase = require("./ModelBase");

function Configurations(){
    const Model = ModelBase({
        name:"configurationPlayers", tableName: "configuration_players"
    });

    return {
        ...Model
    }

}

module.exports = Configurations;