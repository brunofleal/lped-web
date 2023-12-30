import { AxiosError, AxiosRequestConfig, HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react';

import axiosApi from '../shared/axiosApi';

interface CustomFetchProps {
    customConfig?: AxiosRequestConfig;
}

interface FetchProps {
    axiosConfig: AxiosRequestConfig;
    controlFetch?: boolean;
    // eslint-disable-next-line no-unused-vars
    onSuccess?: (httpCode: HttpStatusCode) => void;
    onError?: () => void;
    onFinally?: () => void;

}
const useFetch = <T>({ axiosConfig, controlFetch, onSuccess, onError, onFinally }: FetchProps) => {
    const [data, setData] = useState<null | T>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError>();
    const handleFetch = (props?: CustomFetchProps) => {
        setLoading(true);
        const config = props && props.customConfig ? props.customConfig : axiosConfig;
        axiosApi.request(config).then((response) => {
            if (response.status === 200 && response.data.results) {
                setData(response.data.results);
            } else if (response.status === 200 && response.data) {
                setData(response.data);
            }

            if (onSuccess) {
                onSuccess(response.status);
            }
        }).catch((e: AxiosError) => {
            setError(e);
            if (onError) {
                onError();
            }
        }).finally(() => {
            setLoading(false);
            if (onFinally) {
                onFinally();
            }
        });
    };

    useEffect(() => {
        if (!controlFetch && axiosConfig.url) {
            handleFetch();
        }
    }, [axiosConfig.url]);

    return { data, loading, error, fetch: handleFetch };
};

export default useFetch;
