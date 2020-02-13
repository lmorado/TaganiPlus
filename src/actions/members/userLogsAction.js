import {
    FETCH_MEMBER_LOGS_REQUEST,
    FETCH_MEMBER_LOGS_FAILED,
    FETCH_MEMBER_LOGS_SUCCESS
} from '../../constants/members'
import api from '../../services/api'

const fetchLogsRequest = (id) => ({
    type: FETCH_MEMBER_LOGS_REQUEST,
    id: id
})

const fetchLogsFailed = (error) => ({
    type: FETCH_MEMBER_LOGS_FAILED,
    payload: error
})

const fetchLogsSuccess = (respnse) => ({
    type: FETCH_MEMBER_LOGS_SUCCESS,
    payload: respnse
})

export const getUserLogs = (id) => {
    return async dispatch => {
        dispatch(fetchLogsRequest(10035))
        const result = await api.Members.getMemberLogs(id)
        if(result.error) {
            const error = (result.data) ? result.data : 'Something went wrong...'
            dispatch(fetchLogsFailed(error))
        } else {
            dispatch(fetchLogsSuccess(result.result))
        }
    }
}