import axios from 'axios';

const BASE_URL = '/';// process.env.REACT_SERVER_URL;

const axiosApi = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

export default axiosApi;
