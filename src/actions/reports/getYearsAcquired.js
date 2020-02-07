import {
    GET_INPUTS_YEAR_ACQUIRED_REQUEST,
    GET_INPUTS_YEAR_ACQUIRED_SUCCESS,
} from '../../constants/inputs'

const getInputsYearAcquiredRequest = () => ({
    type: GET_INPUTS_YEAR_ACQUIRED_REQUEST
})


const getInputsYearAcquiredSuccess = (response) => ({
    type: GET_INPUTS_YEAR_ACQUIRED_SUCCESS, payload: response
})

export const getInputsYearAcquired = () => {
    return async dispatch => {
        dispatch(getInputsYearAcquiredRequest())
        dispatch(getInputsYearAcquiredSuccess())
    }
}