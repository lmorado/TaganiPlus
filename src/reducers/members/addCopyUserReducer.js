import {
    ADD_COPY_USER_REQUEST,
    ADD_COPY_USER_FAILED,
    ADD_COPY_USER_SUCCESS,
    RESET_ADD_COPY_USER
} from '../../constants/members'

const initialState = {
    loading: false,
    error: false,
    errorMsg: '',
    success: false
}

const addCopyUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COPY_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADD_COPY_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload
            }
        case ADD_COPY_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                errorMsg: action.payload
            }
        case RESET_ADD_COPY_USER:
            return {
                ...state,
                loading: false,
                error: false,
                errorMsg: '',
                success: false
            }
        default:
            return state
    }
}

export default addCopyUserReducer