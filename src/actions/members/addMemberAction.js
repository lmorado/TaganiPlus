import {
    ADD_MEMBER_REQUEST,
    ADD_MEMBER_FAILED,
    ADD_MEMBER_SUCCESS,
} from '../../constants/members'
import api from '../../services/api'

const addMemberRequest = (userType) => ({
    type: ADD_MEMBER_REQUEST, payload: userType
})

const addMemberFailed = (error) => ({
    type: ADD_MEMBER_FAILED, payload: error
})

const addMemberSuccess = (response) => ({
    type: ADD_MEMBER_SUCCESS, payload: response
})

export const doAddMember = (data) => {
    return async dispatch => {
        dispatch(addMemberRequest(data))
        const result = await api.Members.createAccount(data)
        if (result.status === 500) {
            dispatch(addMemberFailed('Something went wrong'))
        }
        else if (result.status === 400 && result.error) {
            dispatch(addMemberFailed(result && result.data.statusName))
        }
        else if (result.status >= 400 && result.error && result.data) {
            dispatch(addMemberFailed(result.data.statusName))
        }
        else if (result && result.statusCode && result.statusCode >= 400) {
            dispatch(addMemberFailed(result && result.statusName))
        }
        else if (result && result.data && result.data.result === 0) {
            dispatch(addMemberFailed(result && result.data.statusName))
        }
        else {
            dispatch(addMemberSuccess(result.result))
        }
    }
}
