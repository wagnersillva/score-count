const ModelBase = require("./ModelBase");

function Users(){
    const Model = ModelBase({
        name:"User", tableName: "users"
    });

    const findByUsername = async (username) =>  await Model.find({ username }, "*");

    return {
        ...Model,
        findByUsername
    }

}

module.exports = Users;