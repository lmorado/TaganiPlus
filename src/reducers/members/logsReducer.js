import {
    FETCH_MEMBER_LOGS_REQUEST,
    FETCH_MEMBER_LOGS_FAILED,
    FETCH_MEMBER_LOGS_SUCCESS
} from '../../constants/members'

const initialState = {
    loading: false,
    error: false,
    message: '',
    logs: []
}

const logsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MEMBER_LOGS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_MEMBER_LOGS_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }
        case FETCH_MEMBER_LOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                logs: action.payload
            }
        default:
            return state
    }
}

export default logsReducer