import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILED,
} from '../types/user-types';

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_USER_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.post('/api/auth/register', userData, config);

        dispatch({ type: REGISTER_USER_SUCCESS});
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAILED,
            payload: error.response.data.message
        })
    }
}

// Load current user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST});

        const {data} = await axios.get('/api/me');

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAILED,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}