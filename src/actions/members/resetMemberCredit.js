import {
    RESET_MEMBER_CREDIT,
    FETCH_CURRENT_USER_DETAILS_REQUEST,
    FETCH_CURRENT_USER_DETAILS_FAILED,
    FETCH_CURRENT_USER_DETAILS_SUCCESS
} from '../../constants/members'

import api from '../../services/api'

const resetMemberCreditState = (state) => ({
    type: RESET_MEMBER_CREDIT, payload: state
})

export const resetMemberCredit = (userId) => {
    return dispatch => {
        dispatch(resetMemberCreditState({ RESET_MEMBER_CREDIT }))
        if (userId) {
            dispatch(getCurrentMemberDetails(userId))
        }
    }
}

const fetchMemberDetailRequest = () => ({
    type: FETCH_CURRENT_USER_DETAILS_REQUEST
})

const fetchMemberDetailFailed = (error) => ({
    type: FETCH_CURRENT_USER_DETAILS_FAILED, payload: error
})

const fetchMemberDetailSuccess = (response) => ({
    type: FETCH_CURRENT_USER_DETAILS_SUCCESS, payload: response
})

const getCurrentMemberDetails = (id) => {
    return async dispatch => {
        dispatch(fetchMemberDetailRequest())
        const result = await api.Members.getProfile(id)
        if (result.error) {
            const error = (result.data) ? result.data : 'Something went wrong...'
            dispatch(fetchMemberDetailFailed(error))
        } else {
            dispatch(fetchMemberDetailSuccess(result.result))
        }
    }
}