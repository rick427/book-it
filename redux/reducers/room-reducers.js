import {
    ALL_ROOMS_SUCCESS, 
    ALL_ROOMS_FAILED, 
    CLEAR_ERRORS
} from '../types/room-types';

const initialState = {
    room: []
}

export const allRoomsReducer = (state = initialState, action) => {
    switch(action.type){
        case ALL_ROOMS_SUCCESS:
            return {
                ...state,
                roomCount: action.payload.roomsCount,
                resPerPage: action.payload.resPerPage,
                filteredRoomsCount: action.payload.filteredRoomsCount,
                room: action.payload.data
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