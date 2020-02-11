import {
    UPDATE_MEMBER_REQUEST,
    UPDATE_MEMBER_FAILED,
    UPDATE_MEMBER_SUCCESS,
} from '../../constants/members'
import api from '../../services/api'

import { getAgentLists } from './userListAction'
import { hideModal } from '../modal'
import { getUserType } from '../../utils/helpers'
import { resetUserList } from './resetUserListAction';

const updateMemberRequest = (userType) => ({
    type: UPDATE_MEMBER_REQUEST, payload: userType
})

const updateMemberFailed = (error) => ({
    type: UPDATE_MEMBER_FAILED, payload: error
})

const updateMemberSuccess = (response) => ({
    type: UPDATE_MEMBER_SUCCESS, payload: response
})

export const updateMember = (data, page, pageSize, id, userType, statusId = 0, username = '%20', sortOrder = '%20', isPaymentModeCash = false) => {
    return async dispatch => {
        dispatch(updateMemberRequest(data))

        const result = await api.Members.updateAccount(data)
        if (result.status === 500 && result.error) {
            dispatch(updateMemberFailed("Something went wrong"))
        }
        else if (result.status === 400 && result.error) {
            dispatch(updateMemberFailed(result && result.statusName))
        } else if (result && result.statusCode && result.statusCode >= 400) {
            dispatch(updateMemberFailed(result && result.statusName))
        }
        else if (result && result.data && result.data.result === 0) {
            dispatch(updateMemberFailed(result && result.statusName))
        }
        else {
            dispatch(resetUserList())
            dispatch(hideModal())
            dispatch(getAgentLists(page, pageSize, getUserType(userType), id, statusId, username, sortOrder, isPaymentModeCash))
            dispatch(updateMemberSuccess(result.result))
        }
    }
}
