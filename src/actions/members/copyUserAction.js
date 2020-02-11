import {
    ADD_COPY_USER_REQUEST,
    ADD_COPY_USER_FAILED,
    ADD_COPY_USER_SUCCESS,
    FETCH_COPY_USER_REQUEST,
    FETCH_COPY_USER_FAILED,
    FETCH_COPY_USER_SUCCESS,
} from '../../constants/members'
import api from '../../services/api'
import { getAgentLists } from './userListAction'
import { hideModal } from '../modal'
import { getUserType } from '../../utils/helpers'
import { resetUserList } from './resetUserListAction';
import { resetCopyUser } from './resetCopyUser';

const fetchCopyUserRequest = () => ({
    type: FETCH_COPY_USER_REQUEST
})

const fetchCopyUserFailed = (error) => ({
    type: FETCH_COPY_USER_FAILED, payload: error
})

const fetchCopyUserSuccess = (response) => ({
    type: FETCH_COPY_USER_SUCCESS, payload: response
})

export const getCopyUserDetails = (id) => {
    return async dispatch => {
        dispatch(fetchCopyUserRequest())
        const result = await api.Members.getCopyUserDetails(id)
        if (result.error) {
            const errormsg = result.data ? result.data : 'Something went wrong...'
            dispatch(fetchCopyUserFailed(errormsg))
        } else {
            const data = (result) ? result.result : ''
            dispatch(fetchCopyUserSuccess(data))
        }
    }
}

const addCopyUserRequest = () => ({
    type: ADD_COPY_USER_REQUEST
})

const addCopyUserFailed = (error) => ({
    type: ADD_COPY_USER_FAILED, payload: error
})

const addCopyUserSuccess = (response) => ({
    type: ADD_COPY_USER_SUCCESS, payload: response
})


export const addCopyUserDetails = (data, page, pageSize, id, userType, statusId = 0, username = '%20', sortOrder = '%20', isPaymentModeCash = false) => {
    return async dispatch => {
        dispatch(addCopyUserRequest())
        const result = await api.Members.createCopyUser(data)
        if (result.error) {
            const errormsg = result.data ? result.data : 'Something went wrong...'
            dispatch(addCopyUserFailed(errormsg))
        } else {
            if (result.statusCode > 299) {
                dispatch(addCopyUserFailed(result.statusName))
            } else {
                dispatch(resetUserList())
                dispatch(hideModal())
                dispatch(resetCopyUser())
                dispatch(getAgentLists(page, pageSize, getUserType(userType), id, statusId, username, sortOrder, isPaymentModeCash))
                dispatch(addCopyUserSuccess(result.result))
            }
        }
    }
}