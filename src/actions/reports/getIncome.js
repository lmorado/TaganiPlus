import {
    GET_INCOME_REQUEST,
    GET_INCOME_SUCCESS,
    GET_INCOME_FAILED,
} from '../../constants/reports'

const getIncomeRequest = () => ({
    type: GET_INCOME_REQUEST
})

const getIncomeFailed = (error) => ({
    type: GET_INCOME_FAILED, payload: error
})

const getIncomeSuccess = (response) => ({
    type: GET_INCOME_SUCCESS, payload: response
})

export const getIncome = (name = '', sortOrder='', year = '') => {
    return async dispatch => {
        dispatch(getIncomeRequest())
        let storedIncome = { name : name , sortOrder : sortOrder, year : year}
        if (!storedIncome) {
            const errormsg = 'Error 500'
            dispatch(getIncomeFailed(errormsg))
        } else {
            dispatch(getIncomeSuccess(storedIncome))
        }
    }
}