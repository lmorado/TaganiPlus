import {
    GET_BARANGAY_REQUEST,
    GET_BARANGAY_FAILURE,
    GET_BARANGAY_SUCCESS,
} from '../../constants/mailing'

const initialState = {
    hasError: false,
    message: '',
    loading: false
}

const barangays = (state = initialState, action) => {
    switch (action.type) {
        case GET_BARANGAY_REQUEST:
            return {
                ...state,
                hasError: false,
                loading: true
            }
        case GET_BARANGAY_FAILURE:
            return {
                ...state,
                message: action.payload,
                hasError: true,
                loading: false
            }
        case GET_BARANGAY_SUCCESS:
            return {
                ...state,
                data: action.payload,
                hasError: false,
                loading: false,

            }
        default:
            return state
    }
}

export default barangays