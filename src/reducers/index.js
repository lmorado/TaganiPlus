import { combineReducers } from 'redux';
import drinks from './drinks'
import inputs from './inputs'
import reports from './reports'
import auth from './auth'
import mailing from './mailing'
import securityCode from './securityCode'

export default combineReducers({
    auth,
    mailing,
    securityCode,
    drinks,
    inputs,
    reports
});