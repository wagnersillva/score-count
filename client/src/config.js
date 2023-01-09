const configEnvironments = {
    dev: {
        SERVER_URL: "localhost:8000"
    }
}

const getConfigByEnvironment = (environment) => config[environment];


export const config = getConfigByEnvironment("dev");