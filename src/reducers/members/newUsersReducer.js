import {
    FETCH_NEW_USERS_REQUEST,
    FETCH_NEW_USERS_FAILED,
    FETCH_NEW_USERS_SUCCESS
} from '../../constants/members'

const initialState = {
    loading: false,
    error: false,
    newUsers: []
}

const newUsers = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_NEW_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_NEW_USERS_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
            }
        case FETCH_NEW_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                newUsers: action.payload
            }
        default:
            return state
    }
}

export default newUsers