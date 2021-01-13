import { fetchData } from '../../api';
import * as actionTypes from '../actionTypes';
import {initialState} from '../initialUserState';

export const reducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case actionTypes.USER_CREATE:
            fetchData();

        case actionTypes.USER_CREATE_SUCCESS:

            return ({ user: action.payload });

        case actionTypes.USER_CREATE_FAILED:
            return ({user: action.payload});

        default: return state;
    }
}