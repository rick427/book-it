import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    CLEAR_ERRORS
} from '../types/user-types';

const initialState = {
    user: null,
    loading: false,
    success: false,
    error: null
}

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case REGISTER_USER_FAILED:
            return {
                ...state,
                error: action.payload,
                success: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}