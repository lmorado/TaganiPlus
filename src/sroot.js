import { combineReducers } from 'redux'

import mailingReducer from './mailing'
import authReducer from './auth'

const rootReducer = combineReducers({
  authReducer,
  mailingReducer 
})

export default rootReducer