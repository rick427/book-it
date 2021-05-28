import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import {
    ALL_ROOMS_SUCCESS,
    ALL_ROOMS_FAILED,
    CLEAR_ERRORS,
    ROOM_DETAILS_SUCCESS,
    ROOM_DETAILS_FAILED
} from '../types/room-types';

export const getRooms = (req, pageNumber = 1, location = '', guests, category) => async (dispatch) => {
    try {
        const {origin} = absoluteUrl(req);

        let url = `${origin}/api/rooms?page=${pageNumber}&location=${location}`;
        
        if(guests) url = url.concat(`&guestCapacity=${guests}`);
        if(category) url = url.concat(`&category=${category}`);

        const {data} = await axios.get(url);
        dispatch({
            type: ALL_ROOMS_SUCCESS,
            payload: data
        });
        console.log(data);
    } catch (error) {
        dispatch({
            type: ALL_ROOMS_FAILED,
            payload: error.response.data.message
        })
    }
}


export const getRoomDetails = (req, id) => async (dispatch) => {
    try {
        const {origin} = absoluteUrl(req);

        const {data} = await axios.get(`${origin}/api/rooms/${id}`);
        dispatch({
            type: ROOM_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ROOM_DETAILS_FAILED,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}