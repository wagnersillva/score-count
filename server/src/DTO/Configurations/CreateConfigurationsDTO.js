const PlayersConfigModel = require("../../Models/PlayersConfig")();

module.exports = {
    createConfigRequestDTO: (body) => {
        return {
            name: body.gameName,
            score_type: body.scoreType,
            amount_of_matches: body.amountOfMatches,
            create_at: body.createAt,
            last_use: body.lastUse,
            user_id: body.userId
        }
    },
    createSimpleConfigResponseDTO: (data) => {
        return {
            name: data.gameName,
            scoreType: data.score_type,
            amountOfMatches: data.amount_of_matches,
            createAt: data.create_at,
            lastUse: data.last_use,
            userId: data.user_id
        }
    },
    createConfigResponseDTO: async (data) => {
        const players = await PlayersConfigModel.findAll({ configuration_id: data.id });
        return {
            name: data.gameName,
            scoreType: data.score_type,
            amountOfMatches: data.amount_of_matches,
            createAt: data.create_at,
            lastUse: data.last_use,
            userId: data.user_id,
            players: players?.map( e => ({ name: e.name }))
        }
    }
}