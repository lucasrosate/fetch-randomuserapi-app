import * as actionTypes from '../actionTypes';
import { dispatch } from '../store';
import axios from 'axios';


const api = axios.create({
    baseURL: "https://randomuser.me/"
})


const initialState: UserState = {
    user: {
        gender: '',
        name: {
            title: '',
            first: '',
            last: ''
        },
        location: {
            street: {
                number: 0,
                name: ''
            },
            city: '',
            state: '',
            country: '',
            postcode: 0,
            coordinates: {
                latitude: '',
                longitude: ''
            },
            timezone: {
                offset: '',
                description: ''
            }
        },
        email: '',
        login: {
            uuid: '',
            username: '',
            password: '',
            md5: '',
            sha1: '',
            sha256: ''
        },
        dob: {
            date: '',
            age: 0
        },
        registered: {
            date: '',
            age: 0
        },
        phone: '',
        cell: '',
        id: {
            name: '',
            value: ''
        },
        picture: {
            large: '',
            medium: '',
            thumbnail: ''
        },
        nat: ''
    }
}

export const reducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case actionTypes.USER_CREATE:
            api.get('/api')
                .then((response) => {
                    dispatch({ type: actionTypes.USER_CREATE_SUCCESS, payload: response.data.results[0] });
                })
                .catch(err => dispatch({ type: actionTypes.USER_CREATE_FAILED, payload: { ...err.response, status: "error" } }));

        case actionTypes.USER_CREATE_SUCCESS:
            return ({ user: action.payload });

        case actionTypes.USER_CREATE_FAILED:
            return ({ user: action.payload });

        default: return state;
    }
}