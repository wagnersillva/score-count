const initialStorage = {
    configurations: [],
    currentStep: "initial"
}

const getStorageCount = () => {
    const dataFromLocalStorage = localStorage.getItem("score-count-storage");
    return dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : initialStorage;
}

const setStorageCount = (storageValue) => localStorage.setItem("score-count-storage", storageValue)

export const getConfigurationsStorage = () => getStorageCount()?.configurations || [];

export const getCurrentStep = () => getStorageCount()?.currentStep || "initial";

export const getCurrentConfiguration = () => getConfigurationsStorage().find( config => config.isSelected);

export const getPlayers = () => getCurrentConfiguration()?.players ?? [];

export const getMatches = () => {
    const currentConfig = getConfigurationsStorage()
}

export const setConfigurationsStorage = (configurations) => {
    const storage = getStorageCount();

    storage.configurations = [...configurations];

    setStorageCount(JSON.stringify(storage))
}

export const setCurrentStep = (step) => {
    const storage = getStorageCount();

    storage.currentStep = step;

    setStorageCount(JSON.stringify(storage))
}

export const getToken = () =>{
    const dataFromLocalStorage = localStorage.getItem("token-score-count");
    return dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : null;
}