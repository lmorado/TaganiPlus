import { combineReducers } from 'redux'
import data from './membersReducer'
import logs from './logsReducer'
import membersDownline from './membersDownline'
import totalOutStandingReducer from './totalOutstandingReducer'

export default combineReducers({
    data,
    logs,
    membersDownline,
    totalOutStandingReducer
})

/***
     * TODO
     * combine member reducer
*/