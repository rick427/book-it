import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import {
    ALL_ROOMS_SUCCESS,
    ALL_ROOMS_FAILED,
    CLEAR_ERRORS
} from '../types/room-types';

export const getRooms = (req) => async (dispatch) => {
    try {
        const {origin} = absoluteUrl(req);

        const {data} = await axios.get(`${origin}/api/rooms`);
        dispatch({
            type: ALL_ROOMS_SUCCESS,
            payload: data
        })
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