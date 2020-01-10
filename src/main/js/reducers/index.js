import { combineReducers } from 'redux'

import userReducer from './user'
import adminReducer from './admin'

const rootReducer = combineReducers({
    userReducer,
    adminReducer,
})

export default rootReducer;
