import {
    FETCH_AGENTS_REQUEST,
    FETCH_AGENTS_FAILED,
    FETCH_AGENTS_SUCCESS,
    FETCH_AGENTS_DOWNLINE_REQUEST,
    FETCH_AGENTS_DOWNLINE_SUCCESS,
    FETCH_AGENTS_DOWNLINE_FAILED,
} from '../../constants/members'
import api from '../../services/api'
import { getUserType } from '../../utils/helpers'

const fetchAgentFailed = (error) => ({ type: FETCH_AGENTS_FAILED, payload: error })
const fetchAgentSuccess = (response, isScroll) => ({ type: FETCH_AGENTS_SUCCESS, payload: response, isScroll: isScroll })

const fetchAgentDownlineFailed = (error) => ({ type: FETCH_AGENTS_DOWNLINE_FAILED, payload: error })
const fetchAgentDownlineSuccess = (response, isScroll) => ({ type: FETCH_AGENTS_DOWNLINE_SUCCESS, payload: response, isScroll: isScroll })

export const getAgentLists = (page, pageSize, userType, id, statusId = 0, username = '%20', sortOrder = '%20', isPaymentModeCash = false, isScroll = false) => {
    return async dispatch => {
        const result = await api.Members.getUsers(page, pageSize, id, getUserType(userType), statusId, username, sortOrder, isPaymentModeCash, isScroll)
        if (result.error) {
            const errormsg = result.data ? result.data : 'Something went wrong...'
            dispatch(fetchAgentFailed(errormsg))
        } else {
            const data = (result) ? result.result : ''
            dispatch(fetchAgentSuccess(data, isScroll))
        }
    }
}


export const getAgentDownlineLists = (page, pageSize, id, userType, statusId = 0, username = '%20', sortOrder = '%20', isPaymentModeCash = false, isScroll = false) => {
    return async dispatch => {
        const result = await api.Members.getDownlineUsers(page, pageSize, id, getUserType(userType), statusId, username, sortOrder, isPaymentModeCash)
        if (result.error) {
            const errormsg = result.data ? result.data : 'Something went wrong...'
            dispatch(fetchAgentDownlineFailed(errormsg))
        } else {
            const data = (result) ? result.result : ''
            dispatch(fetchAgentDownlineSuccess(data, isScroll))
        }
    }
}

