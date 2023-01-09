import axios from 'axios';
import { config } from '../config'

const { SERVER_URL } = config

const api = axios.create({
    baseURL: `${SERVER_URL}/api`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
});


export default api;