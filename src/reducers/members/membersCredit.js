import {
    PUT_MEMBER_CREDIT_REQUEST,
    PUT_MEMBER_CREDIT_FAILED,
    PUT_MEMBER_CREDIT_SUCCESS,
    RESET_MEMBER_CREDIT
} from '../../constants/members'

const initialState = {
    loading: false,
    error: null,
    creditLimit: 0,
}

const membersCredit = (state = initialState, action) => {
    switch (action.type) {
        case PUT_MEMBER_CREDIT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PUT_MEMBER_CREDIT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case PUT_MEMBER_CREDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                creditLimit: action.payload
            }
        case RESET_MEMBER_CREDIT:
            return {
                ...state,
                loading: false,
                error: null,
                creditLimit: 0
            }
        default:
            return state
    }
}

export default membersCredit 