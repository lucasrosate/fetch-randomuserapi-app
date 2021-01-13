import { api } from '../../api';
import axiosRetry from 'axios-retry';

import * as actionTypes from '../actionTypes';
import { initialState } from '../initialUserState';
import { dispatch, store } from '../store';


// This allows to run a async function in reducer without remove the 'pure function' property from it, that makes redux runs properly
export const fetchDataMiddleware = store => next => (action: UserAction) => {
    if (action.type == actionTypes.USER_CREATE) {
        api.get('api/', {
            'axios-retry': {
                retries: 10,
                retryDelay: (retryCount: number) => retryCount * 1000,
                retryCondition: (error) => error.response.status === 404
            }
        })
            .then((response) =>
                dispatch({
                    type: actionTypes.USER_CREATE_SUCCESS,
                    payload: { ...response.data.results[0], status: "success" }
                }))

            .catch(err =>
                dispatch({
                    type: actionTypes.USER_CREATE_FAILED,
                    payload: { ...err.response, status: "error" }
                }));
    }

    return next(action);

}


export const reducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case actionTypes.USER_CREATE_SUCCESS:
            return ({ user: action.payload });

        case actionTypes.USER_CREATE_FAILED:
            return state;

        default: return state;
    }
}