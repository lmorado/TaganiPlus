import {
    ADD_MEMBER_REQUEST,
    ADD_MEMBER_FAILED,
    ADD_MEMBER_SUCCESS,
    RESET_ADD_MEMBER_STATE
} from '../../constants/members'

const initialState = {
    loading: false,
    error: false,
    success: false,
    userType: '',
    response: ''
}

const addMemberReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MEMBER_REQUEST:
            return {
                ...state,
                loading: true,
                //success: true,
                userType: action.payload
            }

        case ADD_MEMBER_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case ADD_MEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                success: true,
                response: action.payload
            }
        case RESET_ADD_MEMBER_STATE:
            return initialState
        default:
            return state
    }
}

export default addMemberReducer
