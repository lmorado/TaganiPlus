import {
    GET_PROVINCE_REQUEST,
    GET_PROVINCE_FAILURE,
    GET_PROVINCE_SUCCESS,
    GET_MUNICIPALITY_REQUEST,
    GET_MUNICIPALITY_FAILURE,
    GET_MUNICIPALITY_SUCCESS,
    GET_BARANGAY_REQUEST,
    GET_BARANGAY_FAILURE,
    GET_BARANGAY_SUCCESS,
} from '../../constants/mailing'
import api from '../../services/api'
import { invalidInputs, userLocked } from '../../utils/actionsTranslation'

// Province get
const provinceRequest = () => {
    return { type: GET_PROVINCE_REQUEST }
}
const provinceFailure = (error) => {
    return dispatch => dispatch({ type: GET_PROVINCE_FAILURE, payload: error })
}
const provinceSuccess = (response) => {
    return dispatch => dispatch({ type: GET_PROVINCE_SUCCESS, payload: response })
}
export const getProvince = () => {
    return async dispatch => {

        dispatch(provinceRequest())

        const result = await api.Places.provinces()
        if (result.error && result.status === 401) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(provinceFailure(invalidInputs()))
            } else {
                dispatch(provinceFailure(invalidInputs()))
            }
        }
        else if (result.error && result.status === 403) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(provinceFailure(userLocked()))
            } else {
                dispatch(provinceFailure(userLocked()))
            }
        }

        else if (result.error && result.status === 404) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(provinceFailure("Page not found."))
            } else {
                dispatch(provinceFailure("Page not found."))
            }
        }
        else if (result.error && result.status >= 500) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(provinceFailure("Something went wrong1."))
            } else {
                dispatch(provinceFailure("Something went wrong2."))
            }
        }
        else {
            if (result.result && result.result.status === "Lock") {
                dispatch(provinceFailure(userLocked()))
            } else {
                if (result.data) {
                    dispatch(provinceSuccess(result.data.data))
                } else {
                    dispatch(provinceFailure("Something went wrong."))
                }
            }
        }
    }
}


// Municipality get
const municipalityRequest = () => {
    return { type: GET_MUNICIPALITY_REQUEST }
}
const municipalityFailure = (error) => {
    return dispatch => dispatch({ type: GET_MUNICIPALITY_FAILURE, payload: error })
}
const municipalitySuccess = (response) => {
    return dispatch => dispatch({ type: GET_MUNICIPALITY_SUCCESS, payload: response })
}
export const getMunicipality = () => {
    return async dispatch => {

        dispatch(municipalityRequest())

        const result = await api.Places.municipalities()
        if (result.error && result.status === 401) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(municipalityFailure(invalidInputs()))
            } else {
                dispatch(municipalityFailure(invalidInputs()))
            }
        }
        else if (result.error && result.status === 403) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(municipalityFailure(userLocked()))
            } else {
                dispatch(municipalityFailure(userLocked()))
            }
        }

        else if (result.error && result.status === 404) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(municipalityFailure("Page not found."))
            } else {
                dispatch(municipalityFailure("Page not found."))
            }
        }
        else if (result.error && result.status >= 500) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(municipalityFailure("Something went wrong1."))
            } else {
                dispatch(municipalityFailure("Something went wrong2."))
            }
        }
        else {
            if (result.result && result.result.status === "Lock") {
                dispatch(municipalityFailure(userLocked()))
            } else {
                if (result.data) {
                    dispatch(municipalitySuccess(result.data.data))
                } else {
                    dispatch(municipalityFailure("Something went wrong."))
                }
            }
        }
    }
}


// Barangay get
const barangayRequest = () => {
    return { type: GET_BARANGAY_REQUEST }
}
const barangayFailure = (error) => {
    return dispatch => dispatch({ type: GET_BARANGAY_FAILURE, payload: error })
}
const barangaySuccess = (response) => {
    return dispatch => dispatch({ type: GET_BARANGAY_SUCCESS, payload: response })
}
export const getBarangay = () => {
    return async dispatch => {

        dispatch(barangayRequest())

        const result = await api.Places.barangays()
        if (result.error && result.status === 401) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(barangayFailure(invalidInputs()))
            } else {
                dispatch(barangayFailure(invalidInputs()))
            }
        }
        else if (result.error && result.status === 403) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(barangayFailure(userLocked()))
            } else {
                dispatch(barangayFailure(userLocked()))
            }
        }

        else if (result.error && result.status === 404) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(barangayFailure("Page not found."))
            } else {
                dispatch(barangayFailure("Page not found."))
            }
        }
        else if (result.error && result.status >= 500) {
            if (result.data === undefined && result.status === undefined) {
                dispatch(barangayFailure("Something went wrong1."))
            } else {
                dispatch(barangayFailure("Something went wrong2."))
            }
        }
        else {
            if (result.result && result.result.status === "Lock") {
                dispatch(barangayFailure(userLocked()))
            } else {
                if (result.data) {
                    dispatch(barangaySuccess(result.data.data))
                } else {
                    dispatch(barangayFailure("Something went wrong."))
                }
            }
        }
    }
}

