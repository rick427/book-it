import {
    ALL_ROOMS_SUCCESS, 
    ALL_ROOMS_FAILED, 
    ROOM_DETAILS_SUCCESS, 
    ROOM_DETAILS_FAILED, 
    CLEAR_ERRORS
} from '../types/room-types';

const initialState = {
    rooms: []
}

export const allRoomsReducer = (state = initialState, action) => {
    switch(action.type){
        case ALL_ROOMS_SUCCESS:
            return {
                ...state,
                roomsCount: action.payload.roomsCount,
                resPerPage: action.payload.resPerPage,
                filteredRoomsCount: action.payload.filteredRoomsCount,
                rooms: action.payload.data
            }
        case ALL_ROOMS_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const roomDetailsReducer = (state = {room: {}}, action) => {
    switch(action.type){
        case ROOM_DETAILS_SUCCESS:
            return {
                ...state,
                room: action.payload.data
            }
        case ROOM_DETAILS_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}