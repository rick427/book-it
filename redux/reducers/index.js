import {combineReducers} from 'redux';
import { allRoomsReducer, roomDetailsReducer } from './room-reducers';
import { authReducer, forgotPasswordReducer, loadUserReducer, userReducer } from './user-reducers';

const rootReducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    loadUser: loadUserReducer
});

export default rootReducer;