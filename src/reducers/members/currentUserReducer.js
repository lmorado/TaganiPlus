import {
    FETCH_CURRENT_USER_DETAILS_REQUEST,
    FETCH_CURRENT_USER_DETAILS_FAILED,
    FETCH_CURRENT_USER_DETAILS_SUCCESS
} from '../../constants/members'

const initialState = {
    loading: false,
    error: false,
    message: '',
    details: []
}

const currentUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CURRENT_USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_CURRENT_USER_DETAILS_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }
        case FETCH_CURRENT_USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                details: action.payload
            }
        default:
            return state
    }
}

export default currentUserReducer