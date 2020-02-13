import {
    GET_EXPENSE_REQUEST,
    GET_EXPENSE_SUCCESS
} from '../../constants/reports'

const getExpenseRequest = () => ({
    type: GET_EXPENSE_REQUEST
})

const getExpenseSuccess = (response) => ({
    type: GET_EXPENSE_SUCCESS, payload: response
})

export const getExpense = (id) => {
    return async dispatch => {
        dispatch(getExpenseRequest())
        dispatch(getExpenseSuccess(id))
    }
}