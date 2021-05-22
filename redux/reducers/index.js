import {combineReducers} from 'redux';
import { allRoomsReducer } from './room-reducers';

const rootReducer = combineReducers({
    allRooms: allRoomsReducer
});

export default rootReducer;