import {
    REGISTER_REQUEST,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS,
} from '../../constants/register'
import { navigateToPage } from '../../utils/helpers'
import { getLocalStorage, saveLocalStorage, removeLocalStorage } from '../../utils/localStorage'
import api from '../../services/api'

import { invalidInputs, userLocked } from '../../utils/actionsTranslation'

// Register user
const registerRequest = (username) => {
    return { username: username, type: REGISTER_REQUEST }
}

const registerFailure = (error) => {
    return dispatch => dispatch({ type: REGISTER_FAILURE, payload: error })
}

const registerSuccess = (response) => {
    return dispatch => dispatch({ type: REGISTER_SUCCESS, payload: response })
}

export const doRegister = (username, password) => {
    return async dispatch => {

        dispatch(registerRequest(username))

        const result = await api.Auth.register(username, password)
        console.log(result);
        if (result.error && result.status === 401) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(registerFailure(invalidInputs()))
            } else {
                dispatch(registerFailure(invalidInputs()))
            }
        }
        else if (result.error && result.status === 403) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(registerFailure(userLocked()))
            } else {
                dispatch(registerFailure(userLocked()))
            }
        }

        else if (result.error && result.status === 404) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(registerFailure("Page not found."))
            } else {
                dispatch(registerFailure("Page not found."))
            }
        }
        else if (result.error && result.status >= 500) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(registerFailure("Something went wrong1."))
            } else {
                dispatch(registerFailure("Something went wrong2."))
            }
        }
        else {
            if (result.result && result.result.status === "Lock") {
                dispatch(registerFailure(userLocked()))
            } else {
                if (result.data) {
                    console.log(result.data.userId);
                    const isLanguageSelected = getLocalStorage('locale')
                    const userId = result.data.userId
                    // const isFirstTimeRegister = result.result.isFirstTimeRegister
                    localStorage.setItem('userId', JSON.stringify(userId))
                    // localStorage.setItem('isFirstTimeRegister', JSON.stringify(isFirstTimeRegister))

                    if (!isLanguageSelected) {
                        saveLocalStorage('locale', 'en')
                    }

                    dispatch(registerSuccess(result.result))
                } else {
                    dispatch(registerFailure("Something went wrong3."))
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
        removeLocalStorage('isFirstTimeRegister');
        removeLocalStorage('setNicknameLater')
        navigateToPage()
    }
}
