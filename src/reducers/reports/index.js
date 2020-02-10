import { combineReducers } from 'redux'
import createExpense from './createExpense'
import expenseList from './expenseList'
import expense from './expense'
import createIncome from './createIncome'
import incomeList from './incomeList'
import income from './income'
import acquiredDate from './acquiredDate'

export default combineReducers({
    createExpense,
    expenseList,
    expense,
    createIncome,
    incomeList,
    income,
    acquiredDate,
})