import {
    UPDATE_USER_STATUS_REQUEST,
    UPDATE_USER_STATUS_FAILED,
    UPDATE_USER_STATUS_SUCCESS
} from '../../constants/members'

const initialState = {
    loading: false,
    error: false,
    result: ''
}

const updateUserStatusReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_USER_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_USER_STATUS_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                result: action.payload
            }
        case UPDATE_USER_STATUS_SUCCESS: 
            return {
                ...state,
                loading: false,
                error: false,
                result: action.payload
            }
        default:
            return state
    }
}

export default updateUserStatusReducer