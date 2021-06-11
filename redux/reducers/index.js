import {combineReducers} from 'redux';
import { allRoomsReducer, roomDetailsReducer } from './room-reducers';
import { authReducer } from './user-reducers';

const rootReducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer
});

export default rootReducer;