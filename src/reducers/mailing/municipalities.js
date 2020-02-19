import {
    GET_MUNICIPALITY_REQUEST,
    GET_MUNICIPALITY_FAILURE,
    GET_MUNICIPALITY_SUCCESS,
} from '../../constants/mailing'

const initialState = {
    hasError: false,
    message: '',
    loading: false,
    data: undefined
}

const municipalities = (state = initialState, action) => {
    switch (action.type) {
        case GET_MUNICIPALITY_REQUEST:
            return {
                ...state,
                hasError: false,
                loading: true
            }
        case GET_MUNICIPALITY_FAILURE:
            return {
                ...state,
                message: action.payload,
                hasError: true,
                loading: false
            }
        case GET_MUNICIPALITY_SUCCESS:
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

export default municipalities