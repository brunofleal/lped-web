import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

import endpoints from '../constants/endpoints';
import axiosApi from '../shared/axiosApi';

const ACCESS_TOKEN_KEY = 'access';
const IS_VALID_TOKEN_KEY = 'isValid';

const isAuthTokenValid = () => {
    const [isValid, setIsValid] = useState<boolean>(false);
    const token = localStorage.getItem(ACCESS_TOKEN_KEY) ?? '';
    const isValidLocal = !!localStorage.getItem(IS_VALID_TOKEN_KEY) ? true : false;
    const checkAuthConfig: AxiosRequestConfig = {
        url: endpoints.auth.get.path.replace(endpoints.auth.get.pathParam.token, token),
        method: 'GET',
    };
    useEffect(() => {
        if (!isValidLocal && token) {
            axiosApi.request(checkAuthConfig).then((response) => {
                setIsValid(response.status === 200);
                response.status === 200 ?
                    localStorage.setItem(IS_VALID_TOKEN_KEY, 'true') :
                    localStorage.removeItem(IS_VALID_TOKEN_KEY);
            });
        }
    }, [token]);
    return isValidLocal || isValid;
};

const setToken = (token: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

const clearToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(IS_VALID_TOKEN_KEY);
};

export { isAuthTokenValid, setToken, clearToken };
