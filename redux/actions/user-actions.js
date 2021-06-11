import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    CLEAR_ERRORS
} from '../types/user-types';

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_USER_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/auth/register', userData, config);

        dispatch({ type: REGISTER_USER_SUCCESS});
    } catch (error) {
        dispatch({
            type: ALL_ROOMS_FAILED,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}