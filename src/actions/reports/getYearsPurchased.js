import {
    GET_INPUTS_YEAR_PURCHASED_REQUEST,
    GET_INPUTS_YEAR_PURCHASED_SUCCESS,
} from '../../constants/inputs'

const getInputsYearPurchasedRequest = () => ({
    type: GET_INPUTS_YEAR_PURCHASED_REQUEST
})


const getInputsYearPurchasedSuccess = (response) => ({
    type: GET_INPUTS_YEAR_PURCHASED_SUCCESS, payload: response
})

export const getInputsYearPurchased = () => {
    return async dispatch => {
        dispatch(getInputsYearPurchasedRequest())
        dispatch(getInputsYearPurchasedSuccess())
    }
}