import axios from 'axios';

export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '/';

const axiosApi = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

export default axiosApi;
