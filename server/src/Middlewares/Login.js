const jwt = require("../Security/jwt");

module.exports = {
    verifyAuth: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            req.user = jwt.verifyToken(token);
            next();
        } catch (error) {
            return res.status(401).send({mensagem: 'Falha na autenticação'});
        }
    }
}