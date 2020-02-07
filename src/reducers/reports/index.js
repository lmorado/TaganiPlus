import { combineReducers } from 'redux'
import createExpense from './createExpense'
import expenseList from './expenseList'
import acquiredDate from './acquiredDate'
import expense from './expense'

export default combineReducers({
    createExpense,
    expenseList,
    acquiredDate,
    expense
})