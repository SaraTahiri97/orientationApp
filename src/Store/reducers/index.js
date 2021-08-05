

import {combineReducers} from 'redux';

import Languages_Reducer from './Languages_Reducer';
import Authentification_Reducer from './Authentification_Reducer';
import organisations_interests from './organisations_interests';
import announcements from './announcements';
import notifications from './notifications';
import permissions from './permissions';

const rootReducer = combineReducers({
    Languages_Reducer:Languages_Reducer,
    Authentification_Reducer:Authentification_Reducer,
    organisations_interests:organisations_interests,
    announcements:announcements,
    notifications:notifications,
    permissions:permissions,
});



export default rootReducer;