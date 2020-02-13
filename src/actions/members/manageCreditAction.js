import {
    PUT_MEMBER_CREDIT_REQUEST,
    PUT_MEMBER_CREDIT_FAILED,
    PUT_MEMBER_CREDIT_SUCCESS
} from '../../constants/members'
import { getAgentLists } from './userListAction'
import { hideModal } from '../modal'
import { getUserType } from '../../utils/helpers'
import api from '../../services/api'
import { resetUserList } from './resetUserListAction';
import { resetMemberCredit } from './resetMemberCredit';

const putMemberCreditRequest = () => ({
    type: PUT_MEMBER_CREDIT_REQUEST
})

const putMemberCreditFailed = (error) => ({
    type: PUT_MEMBER_CREDIT_FAILED, payload: error
})

const putMemberCreditSuccess = (response) => ({
    type: PUT_MEMBER_CREDIT_SUCCESS, payload: response
})


export const updateMemberCredits = (userId, creditLimit, modifiedByUserId,
    page, pageSize, id, userType, statusId = 0, username = '%20', sortOrder = '%20', isPaymentModeCash = false) => {
    return async dispatch => {
        dispatch(putMemberCreditRequest())
        const result = await api.Members.manageCredits(userId, creditLimit, modifiedByUserId)
        if (result.error) {
            dispatch(putMemberCreditFailed(result.data))
        } else {
            dispatch(resetUserList())
            dispatch(hideModal())
            dispatch(getAgentLists(page, pageSize, userType, id, statusId, username, sortOrder, isPaymentModeCash))
            dispatch(putMemberCreditSuccess(result.result))
            dispatch(resetMemberCredit(id))
        }
    }
}