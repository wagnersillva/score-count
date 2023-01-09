const messageHttp = {
    200: "Ok",
    201: "Registro criado com sucesso",
    401: "Falha na autenticação",
    404: "Registro não encontrado",
    500: "Ocorreu um erro no servidor. Por favor, tente novamente em alguns instantes."
}

const listCodeErrors = [401, 404, 500];

const response = ({ res, status = 200, data}) => {
    let modelData = data;

    if(listCodeErrors.includes(status)){
        modelData = {
            message: messageHttp[status],
            ...data
        }
    }

    return res.status(status).send(modelData)
};

module.exports = response;