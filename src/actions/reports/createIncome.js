import {
    CREATE_INCOME_REQUEST,
    CREATE_INCOME_SUCCESS,
    CREATE_INCOME_FAILED,
    RESET_CREATE_INCOME
} from '../../constants/reports'


const createIncomeRequest = () => ({
    type: CREATE_INCOME_REQUEST
})

const createIncomeFailed = (error) => ({
    type: CREATE_INCOME_FAILED, payload: error
})

const createIncomeSuccess = (response) => ({
    type: CREATE_INCOME_SUCCESS, payload: response
})

const resetCreateIncomeRequest = () => ({
    type: RESET_CREATE_INCOME
})


export const createIncome = (data) => {
    return dispatch => {
        dispatch(createIncomeRequest())
        let storedIncome = data
        if (!storedIncome) {
            const errormsg = 'Error 500'
            dispatch(createIncomeFailed(errormsg))
        } else {
            dispatch(createIncomeSuccess(storedIncome))
        }
    }
}

export const resetCreateIncome = () => {
    return dispatch => {
        dispatch(resetCreateIncomeRequest())
    }
}