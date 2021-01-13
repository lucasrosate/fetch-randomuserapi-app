import axios from 'axios';
import * as actionTypes from './store/actionTypes';
import { dispatch } from './store/store';
import axiosRetry from 'axios-retry';



export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

export const fetchData = () => {
    api.get('api/', {
        'axios-retry': {
            retries: 10,
            retryDelay: (retryCount: number) => retryCount * 1000,
            retryCondition: (error) => error.response.status === 404
        }
    })
    
    .then((response) => {
        dispatch({ type: actionTypes.USER_CREATE_SUCCESS, payload: {...response.data.results[0], status: "success"} });
    })
    .catch(err => dispatch({ type: actionTypes.USER_CREATE_FAILED, payload: { ...err.response, status: "error" } }));
}

