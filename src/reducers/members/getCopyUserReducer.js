import {
    FETCH_COPY_USER_REQUEST,
    FETCH_COPY_USER_FAILED,
    FETCH_COPY_USER_SUCCESS,
    RESET_COPY_USER,
} from '../../constants/members'

const initialState = {
    loading: false,
    error: false,
    data: '',
    errorMsg: ''
}

const getCopyUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COPY_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_COPY_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload
            }
        case FETCH_COPY_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload
            }
        case RESET_COPY_USER:
            return {
                ...state,
                loading: false,
                error: false,
                data: '',
                errorMsg: ''
            }
        default:
            return state
    }
}



export default getCopyUserReducer
