import {
    GET_EXPENSE_REQUEST,
    GET_EXPENSE_SUCCESS,
    GET_EXPENSE_FAILED,
} from '../../constants/reports'

const getExpenseRequest = () => ({
    type: GET_EXPENSE_REQUEST
})

const getExpenseFailed = (error) => ({
    type: GET_EXPENSE_FAILED, payload: error
})

const getExpenseSuccess = (response) => ({
    type: GET_EXPENSE_SUCCESS, payload: response
})

export const getExpense = (name = '', sortOrder='', year = '') => {
    return async dispatch => {
        dispatch(getExpenseRequest())
        let storedExpense = { name : name , sortOrder : sortOrder, year : year}
        if (!storedExpense) {
            const errormsg = 'Error 500'
            dispatch(getExpenseFailed(errormsg))
        } else {
            dispatch(getExpenseSuccess(storedExpense))
        }
    }
}