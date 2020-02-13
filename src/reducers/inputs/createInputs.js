import { CREATE_INPUTS_FAILED, CREATE_INPUTS_REQUEST, CREATE_INPUTS_SUCCESS, RESET_CREATE_INPUTS } from '../../constants/inputs'
import { getLocalStorage, saveLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    response: '',
    success: false,
}


const createInputs = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_INPUTS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case CREATE_INPUTS_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case CREATE_INPUTS_SUCCESS:
            //save the inputs in local storage
            let inputs = getLocalStorage('inputsList') ? JSON.parse(localStorage.getItem('inputsList')) : []
            inputs.push({id : Math.floor(1000 + Math.random() * 9000), ...action.payload})
            saveLocalStorage('inputsList', inputs)

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                response: action.payload
            }

        case RESET_CREATE_INPUTS:

            return initialState

        default:
            return state
    }
}

export default createInputs