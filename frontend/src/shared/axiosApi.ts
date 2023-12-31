import axios from 'axios';

import config from './config';

export const BASE_URL = config.NODE_ENV === 'development' ?
    'http://localhost:8000' :
    config.SERVER_URL;

const axiosApi = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

export default axiosApi;
