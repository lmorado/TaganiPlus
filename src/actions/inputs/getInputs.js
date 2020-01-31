import {
    GET_INPUTS_REQUEST,
    GET_INPUTS_SUCCESS,
    GET_INPUTS_FAILED,
} from '../../constants/inputs'

const getInputsRequest = () => ({
    type: GET_INPUTS_REQUEST
})

const getInputsFailed = (error) => ({
    type: GET_INPUTS_FAILED, payload: error
})

const getInputsSuccess = (response) => ({
    type: GET_INPUTS_SUCCESS, payload: response
})

export const getInputs = (name = '', sortOrder='', year = '') => {
    return async dispatch => {
        dispatch(getInputsRequest())
        let storedInputs = { name : name , sortOrder : sortOrder, year : year}
        if (!storedInputs) {
            const errormsg = 'Error 500'
            dispatch(getInputsFailed(errormsg))
        } else {
            dispatch(getInputsSuccess(storedInputs))
        }
    }
}