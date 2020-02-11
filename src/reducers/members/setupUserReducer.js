import {
    FETCH_CREATE_MEMBER_REQUEST,
    FETCH_CREATE_MEMBER_FAILED,
    FETCH_CREATE_MEMBER_SUCCESS
} from '../../constants/members'

const initialState = {
    loading: false,
    error: false,
    forms: {}
}

const setupUserReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_CREATE_MEMBER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_CREATE_MEMBER_FAILED:
            return {
                ...state,   
                loading: false,
                error: action.payload
            }
        case FETCH_CREATE_MEMBER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                forms: action.payload
            }
        default:
            return state
    }
}

export default setupUserReducer