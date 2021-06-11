import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILED,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILED,
    UPDATE_PROFILE_RESET,
    
    CLEAR_ERRORS,
    RESET_REGISTRATION,
} from '../types/user-types';

const initialState = {
    user: null,
    loading: false,
    isAuthenticated: false,
    success: false,
    error: null,
    isUpdated: false
}

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case REGISTER_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            }
        case LOAD_USER_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        case RESET_REGISTRATION:
            return {
                ...state,
                success: false
            }
        default:
            return state;
    }
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_PROFILE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_PROFILE_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false
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