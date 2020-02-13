import {
    GET_INPUT_REQUEST,
    GET_INPUT_SUCCESS
} from '../../constants/inputs'

const getInputRequest = () => ({
    type: GET_INPUT_REQUEST
})

const getInputSuccess = (response) => ({
    type: GET_INPUT_SUCCESS, payload: response
})

export const getInput = (id) => {
    return async dispatch => {
        dispatch(getInputRequest())
        dispatch(getInputSuccess(id))
    }
}