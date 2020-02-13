import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
} from '../../constants/auth'
import { navigateToPage } from '../../utils/helpers'
import { getLocalStorage, saveLocalStorage, removeLocalStorage } from '../../utils/localStorage'
import api from '../../services/api'

import { invalidInputs, userLocked } from '../../utils/actionsTranslation'

// Login user
const loginRequest = (username) => {
    return { username: username, type: LOGIN_REQUEST }
}

const loginFailure = (error) => {
    return dispatch => dispatch({ type: LOGIN_FAILURE, payload: error })
}

const loginSuccess = (response) => {
    return dispatch => dispatch({ type: LOGIN_SUCCESS, payload: response })
}

export const doLogin = (username, password) => {
    return async dispatch => {

        dispatch(loginRequest(username))

        const result = await api.Auth.login(username, password)
        if (result.error && result.status === 401) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(loginFailure(invalidInputs()))
            } else {
                dispatch(loginFailure(invalidInputs()))
            }
        }
        else if (result.error && result.status === 403) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(loginFailure(userLocked()))
            } else {
                dispatch(loginFailure(userLocked()))
            }
        }

        else if (result.error && result.status === 404) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(loginFailure("Page not found."))
            } else {
                dispatch(loginFailure("Page not found."))
            }
        }
        else if (result.error && result.status >= 500) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(loginFailure("Something went wrong1."))
            } else {
                dispatch(loginFailure("Something went wrong2."))
            }
        }
        else {
            if (result.result && result.result.status === "Lock") {
                dispatch(loginFailure(userLocked()))
            } else {
                if (result.result) {
                    const isLanguageSelected = getLocalStorage('locale')
                    const userId = result.result.userId
                    const isFirstTimeLogin = result.result.isFirstTimeLogin
                    localStorage.setItem('userId', JSON.stringify(userId))
                    localStorage.setItem('isFirstTimeLogin', JSON.stringify(isFirstTimeLogin))

                    if (!isLanguageSelected) {
                        saveLocalStorage('locale', 'en')
                    }

                    dispatch(loginSuccess(result.result))
                } else {
                    dispatch(loginFailure("Something went wrong3."))
                }
            }
        }
    }
}

// Logout user
export const logoutSuccess = () => {
    return dispatch => dispatch({ type: LOGOUT_SUCCESS })
}

export const doLogout = () => {
    return dispatch => {
        dispatch(logoutSuccess())
        removeLocalStorage('userId')
        removeLocalStorage('user')
        removeLocalStorage('userToken')
        removeLocalStorage('isFirstTimeLogin');
        removeLocalStorage('setNicknameLater')
        navigateToPage()
    }
}