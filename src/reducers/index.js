import { combineReducers } from 'redux';
import drinks from './drinks'
import inputs from './inputs'
import reports from './reports'

export default combineReducers({
    drinks,
    inputs,
    reports
});