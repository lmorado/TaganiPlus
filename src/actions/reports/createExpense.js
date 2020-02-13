import {
    CREATE_EXPENSE_REQUEST,
    CREATE_EXPENSE_SUCCESS,
    CREATE_EXPENSE_FAILED,
    RESET_CREATE_EXPENSE
} from '../../constants/reports'


const createExpenseRequest = () => ({
    type: CREATE_EXPENSE_REQUEST
})

const createExpenseFailed = (error) => ({
    type: CREATE_EXPENSE_FAILED, payload: error
})

const createExpenseSuccess = (response) => ({
    type: CREATE_EXPENSE_SUCCESS, payload: response
})

const resetCreateExpenseRequest = () => ({
    type: RESET_CREATE_EXPENSE
})


export const createExpense = (data) => {
    return dispatch => {
        dispatch(createExpenseRequest())
        let storedExpense = data
        if (!storedExpense) {
            const errormsg = 'Error 500'
            dispatch(createExpenseFailed(errormsg))
        } else {
            dispatch(createExpenseSuccess(storedExpense))
        }
    }
}

export const resetCreateExpense = () => {
    return dispatch => {
        dispatch(resetCreateExpenseRequest())
    }
}