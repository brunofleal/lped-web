import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const axiosApi = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

export default axiosApi;
