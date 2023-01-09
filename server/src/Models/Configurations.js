const ModelBase = require("./ModelBase");

function Configurations(){
    const Model = ModelBase({
        name:"configurationUsers", tableName: "configuration_users"
    });

    const findByNameAndUserId = async (name, userId) =>  await Model.find({ name, user_id: userId }, "*");

    return {
        ...Model,
        findByNameAndUserId
    }

}

module.exports = Configurations;