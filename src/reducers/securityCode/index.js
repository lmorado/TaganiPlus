import {
    OTP_REQUEST,
    OTP_FAILURE,
    OTP_SUCCESS,
    CHANGE_LOGIN_NICKNAME
} from '../../constants/securityCode'

import { saveLocalStorage } from '../../utils/localStorage'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    hasError: false,
    message: '',
    user: (user) ? user : '',
    loading: false,
}

const securityCodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case OTP_REQUEST:
            return {
                ...state,
                hasError: false,
                loading: true,
            }
        case OTP_SUCCESS:
            return {
                ...state,
                hasError: false,
                loading: false,
                user: action.payload
            }
        case OTP_FAILURE:
            return {
                ...state,
                hasError: true,
                loading: false,
                message: action.payload
            }

        case CHANGE_LOGIN_NICKNAME:

            let newUser = Object.assign({}, state.user)

            newUser = { ...newUser, nickname: action.payload }

            saveLocalStorage('user', 
               newUser
            )

            return {
                ...state,
                user: newUser
            }






        default:
            return state
    }
}

export default securityCodeReducer