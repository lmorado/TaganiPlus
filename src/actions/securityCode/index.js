import {
    OTP_REQUEST,
    OTP_FAILURE,
    OTP_SUCCESS,
    CHANGE_LOGIN_NICKNAME
} from '../../constants/securityCode'
import { navigateToPage } from '../../utils/helpers'
import { removeLocalStorage } from '../../utils/localStorage'

import api from '../../services/api'

const otpRequest = (pin) => {
    return { pin: pin, type: OTP_REQUEST }
}

const otpFailure = (error) => {
    return dispatch => dispatch({ type: OTP_FAILURE, payload: error })
}

const otpSuccess = (response) => {
    return dispatch => dispatch({
        type: OTP_SUCCESS,
        payload: response
    })
}

const changeNickname = (nickname) => {
    return { payload: nickname, type: CHANGE_LOGIN_NICKNAME }
}

export const doValidatePin = (pin) => {
    return async dispatch => {
        dispatch(otpRequest(pin))
        const userId = localStorage.getItem('userId')
        const result = await api.Auth.validatePin(userId, pin)
        if (result.status === 400 && result.error) {
            dispatch(otpFailure('Invalid security code.'))
        } else {
            const user = result.result
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('userToken', user ? user.token : null)
            dispatch(otpSuccess(result.result))
            navigateToPage()
        }
    }
}
export const doCreatePin = (pin) => {
    return async dispatch => {
        dispatch(otpRequest(pin))
        const userId = localStorage.getItem('userId')
        const result = await api.Auth.createPin(userId, pin)
        if (result.status === 400 && result.error) {
            dispatch(otpFailure(result.data.statusName))
        } else {
            const user = result.result
            removeLocalStorage('setNicknameLater')
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('userToken', user.token)
            dispatch(otpSuccess(result.result))
            navigateToPage()
        }
    }
}

export const changeNicknameOfLoggedinUser = (nickname) => {
    return dispatch => {
        dispatch(changeNickname(nickname))
    }
}