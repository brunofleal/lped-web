import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

import endpoints from '../constants/endpoints';
import axiosApi from '../shared/axiosApi';

const ACCESS_TOKEN_KEY = 'access';

const isAuthTokenValid = () => {
    const [isValid, setIsValid] = useState<boolean>(false);
    const token = localStorage.getItem(ACCESS_TOKEN_KEY) ?? '';
    const checkAuthConfig: AxiosRequestConfig = {
        url: endpoints.auth.get.path.replace(endpoints.auth.get.pathParam.token, token),
        method: 'GET',
    };
    useEffect(() => {
        if (token) {
            axiosApi.request(checkAuthConfig).then((response) => {
                setIsValid(response.status === 200);
            });
        }
    }, [token]);
    return isValid;
};

const setToken = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

const clearToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export { isAuthTokenValid, setToken, clearToken };
