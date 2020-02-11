import {
    FETCH_MEMBER_DETAILS_REQUEST,
    FETCH_MEMBER_DETAILS_FAILED,
    FETCH_MEMBER_DETAILS_SUCCESS
} from '../../constants/members'

const initialState = {
    loading: false,
    error: false,
    message: '',
    details: []
}

const memberDetailsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MEMBER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_MEMBER_DETAILS_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }
        case FETCH_MEMBER_DETAILS_SUCCESS:
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

export default memberDetailsReducer