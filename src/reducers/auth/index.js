// import {
//     LOGIN_REQUEST,
//     LOGIN_FAILURE,
//     LOGIN_SUCCESS,
//     LOGOUT_SUCCESS
// } from '../../constants/auth'

import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../../constants/auth'

const localuserId = JSON.parse(localStorage.getItem('userId'))

const initialState = {
    hasError: false,
    message: '',
    authenticatedOnLogin: (localuserId) ? true : false,
    userId: (localuserId) ? localuserId : '',
    loading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                hasError: false,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                authenticatedOnLogin: true,
                hasError: false,
                userId: action.payload,
                loading: false
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                message: action.payload,
                hasError: true,
                loading: false
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                userId: ''
            }
        default:
            return state
    }
}

export default authReducer