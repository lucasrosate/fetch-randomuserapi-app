import * as actionTypes from '../actionTypes';
import { dispatch } from '../store';

// action to create user, this is not
export const createUser = () => {
    const action: UserAction = {
        type: actionTypes.USER_CREATE,
        payload: {}
    }

    return dispatch(action);
}

export const updateUsername = (user: IUser) => {
    const action: UserAction = {
        type: actionTypes.USER_UPDATE_USERNAME,
        payload: user,
    }

    return dispatch(action);
}


