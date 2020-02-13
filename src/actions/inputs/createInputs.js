import {
    CREATE_INPUTS_REQUEST,
    CREATE_INPUTS_SUCCESS,
    CREATE_INPUTS_FAILED,
    RESET_CREATE_INPUTS
} from '../../constants/inputs'


const createInputsRequest = () => ({
    type: CREATE_INPUTS_REQUEST
})

const createInputsFailed = (error) => ({
    type: CREATE_INPUTS_FAILED, payload: error
})

const createInputsSuccess = (response) => ({
    type: CREATE_INPUTS_SUCCESS, payload: response
})

const resetCreateInputsRequest = () => ({
    type: RESET_CREATE_INPUTS
})


export const createInputs = (data) => {
    return dispatch => {
        dispatch(createInputsRequest())
        let storedInputs = data
        if (!storedInputs) {
            const errormsg = 'Error 500'
            dispatch(createInputsFailed(errormsg))
        } else {
            dispatch(createInputsSuccess(storedInputs))
        }
    }
}

export const resetCreateInputs = () => {
    return dispatch => {
        dispatch(resetCreateInputsRequest())
    }
}