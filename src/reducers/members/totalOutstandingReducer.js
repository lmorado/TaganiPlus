import {
    FETCH_MEMBER_TOTAL_OUTSTANDING_REQUEST,
    FETCH_MEMBER_TOTAL_OUTSTANDING_SUCCESS,
    FETCH_MEMBER_TOTAL_OUTSTANDING_FAILED,
    RESET_MEMBER_TOTAL_OUTSTANDING
} from '../../constants/members'

const initialState = {
    loading: false,
    error: false,
    message: '',
    data: []
}

const totalOutstandingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MEMBER_TOTAL_OUTSTANDING_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_MEMBER_TOTAL_OUTSTANDING_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }
        case FETCH_MEMBER_TOTAL_OUTSTANDING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload
            }
        case RESET_MEMBER_TOTAL_OUTSTANDING:
            return initialState
        default:
            return state
    }
}

export default totalOutstandingReducer