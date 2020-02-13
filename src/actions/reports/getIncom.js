import {
    GET_INCOME_REQUEST,
    GET_INCOME_SUCCESS
} from '../../constants/reports'

const getIncomeRequest = () => ({
    type: GET_INCOME_REQUEST
})

const getIncomeSuccess = (response) => ({
    type: GET_INCOME_SUCCESS, payload: response
})

export const getIncome = (id) => {
    return async dispatch => {
        dispatch(getIncomeRequest())
        dispatch(getIncomeSuccess(id))
    }
}