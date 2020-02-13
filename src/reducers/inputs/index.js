import { combineReducers } from 'redux'
import createInputs from './createInputs'
import inputsList from './inputsList'
import acquiredDate from './acquiredDate'
import input from './input'

export default combineReducers({
    createInputs,
    inputsList,
    acquiredDate,
    input
})