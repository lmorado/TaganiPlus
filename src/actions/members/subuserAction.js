import {
    ADD_SUBUSER_REQUEST,
    ADD_SUBUSER_FAILED,
    ADD_SUBUSER_SUCCESS,
    FETCH_SUBUSER_REQUEST,
    FETCH_SUBUSER_FAILED,
    FETCH_SUBUSER_SUCCESS,
    FETCH_SINGLE_SUBUSER_REQUEST,
    FETCH_SINGLE_SUBUSER_FAILED,
    FETCH_SINGLE_SUBUSER_SUCCESS,
    FETCH_SUBUSERUSERNAME_REQUEST,
    FETCH_SUBUSERUSERNAME_FAILED,
    FETCH_SUBUSERUSERNAME_SUCCESS,
    UPDATE_SINGLE_SUBUSER,
    UPDATE_SUBUSER_FAILED,
    UPDATE_SUBUSER_SUCCESS,
    UPDATE_SUBUSER_REQUEST
} from '../../constants/members'
import api from '../../services/api'


const addSubuserRequest = () => ({ type: ADD_SUBUSER_REQUEST })
const addSubuserFailed = (error) => ({ type: ADD_SUBUSER_FAILED, payload: error })
const addSubuserSuccess = (response) => ({ type: ADD_SUBUSER_SUCCESS, payload: response })

const updateSubuserRequest = () => ({ type: UPDATE_SUBUSER_REQUEST })
const updateSubuserFailed = (error) => ({ type: UPDATE_SUBUSER_FAILED, payload: error })
const updateSubuserSuccess = (response) => ({ type: UPDATE_SUBUSER_SUCCESS, payload: response })

const getSubUserRequest = () => ({ type: FETCH_SUBUSER_REQUEST })
const getSubUserFailed = (error) => ({ type: FETCH_SUBUSER_FAILED, payload: error })
const getSubUserSuccess = (response) => ({ type: FETCH_SUBUSER_SUCCESS, payload: response })

const getSubUserUsernameRequest = () => ({ type: FETCH_SUBUSERUSERNAME_REQUEST })
const getSubUserUsernameFailed = (error) => ({ type: FETCH_SUBUSERUSERNAME_FAILED, payload: error })
const getSubUserUsernameSuccess = (response) => ({ type: FETCH_SUBUSERUSERNAME_SUCCESS, payload: response })

const getSingleSubuserRequest = () => ({ type: FETCH_SINGLE_SUBUSER_REQUEST })
const getSingleSubuserFailed = (error) => ({ type: FETCH_SINGLE_SUBUSER_FAILED, payload: error })
const getSingleSubuserSuccess = (response) => ({ type: FETCH_SINGLE_SUBUSER_SUCCESS, payload: response })
const updateSingleSubuserRequest = (response) => ({ type: UPDATE_SINGLE_SUBUSER, payload: response })




export const doAddSubuser = (data) => {
    return async dispatch => {
        dispatch(addSubuserRequest())
        const result = await api.Members.createSubusers(data)
        if (result.error) {
            dispatch(addSubuserFailed(result.data.statusName))
        } else {
            dispatch(addSubuserSuccess(result.result))
            dispatch(getSubUser(1, 100, data.createdBy));
        }
    }
}

export const doUpdateSubuser = (data) => {
    return async dispatch => {
        dispatch(updateSubuserRequest())
        const result = await api.Members.updateSubusers(data)
        if (result.error || result.error === 0) {
            dispatch(updateSubuserFailed(result.data))
        } else {
            dispatch(updateSubuserSuccess(result.result))
            dispatch(getSubUser(1, 100, data.createdBy));
        }
    }
}



export const getSubUser = (page, pageSize, id) => {
    return async dispatch => {
        dispatch(getSubUserRequest())
        const result = await api.Members.getSubusers(page, pageSize, id)
        if (result.error || result.error === 0) {
            dispatch(getSubUserFailed(result.data))
        } else {
            dispatch(getSubUserSuccess(result.result))
        }

    }
}

export const getSubUserById = (id) => {
    return async dispatch => {
        dispatch(getSingleSubuserRequest())
        const result = await api.Members.getSingleSubuser(id)
        if (result.error) {
            dispatch(getSingleSubuserFailed(result.data))
        } else {
            dispatch(getSingleSubuserSuccess(result.result))
        }
    }
}

export const getSubUserUsername = (id) => {
    return async dispatch => {
        dispatch(getSubUserUsernameRequest())
        const result = await api.Members.getSubUserSuggestedName(id)
        if (result.error) {
            dispatch(getSubUserUsernameFailed(result.data))
        } else {
            dispatch(getSubUserUsernameSuccess(result.result))
        }
    }
}

export const updateSubUser = (data) => {
    return dispatch => {
        dispatch(updateSingleSubuserRequest(data))
    }
}
