import {
    GET_PROVINCE_REQUEST,
    GET_PROVINCE_FAILURE,
    GET_PROVINCE_SUCCESS,
} from '../../constants/mailing'

const initialState = {
    hasError: false,
    message: '',
    loading: false,
    data: undefined
}

const provinces = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROVINCE_REQUEST:
            return {
                ...state,
                hasError: false,
                loading: true
            }
        case GET_PROVINCE_FAILURE:
            return {
                ...state,
                message: action.payload,
                hasError: true,
                loading: false
            }
        case GET_PROVINCE_SUCCESS:
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

export default provinces