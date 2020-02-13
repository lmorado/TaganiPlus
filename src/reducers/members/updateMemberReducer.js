import {
    UPDATE_MEMBER_REQUEST,
    UPDATE_MEMBER_FAILED,
    UPDATE_MEMBER_SUCCESS,
    RESET_UPDATE_MEMBER_STATE
} from '../../constants/members'

const initialState = {
    loading: false,
    error: false,
    success: false,
    userType: '',
    response: ''
}

const updateMemberReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MEMBER_REQUEST:
            return {
                ...state,
                loading: true,
                //success: true,
                userType: action.payload
            }
        case UPDATE_MEMBER_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case UPDATE_MEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                success: true,
                response: action.payload
            }
        case RESET_UPDATE_MEMBER_STATE:
            return {
                ...state,
                loading: false,
                error: false,
                success: false,
                userType: '',
                response: ''
            }
        default:
            return state
    }
}

export default updateMemberReducer
