import {
    FETCH_MEMBER_DETAILS_REQUEST,
    FETCH_MEMBER_DETAILS_FAILED,
    FETCH_MEMBER_DETAILS_SUCCESS
} from '../../constants/members'
import api from '../../services/api'

const fetchMemberDetailRequest = () => ({
    type: FETCH_MEMBER_DETAILS_REQUEST
})

const fetchMemberDetailFailed = (error) => ({
    type: FETCH_MEMBER_DETAILS_FAILED, payload: error
})

const fetchMemberDetailSuccess = (response) => ({
    type: FETCH_MEMBER_DETAILS_SUCCESS, payload: response
})

export const getMemberDetails = (id) => {
    return async dispatch => {
        dispatch(fetchMemberDetailRequest())
        const result = await api.Members.getProfile(id)
        if(result.error) {
            const error = (result.data) ? result.data : 'Something went wrong...'
            dispatch(fetchMemberDetailFailed(error))
        } else {
            dispatch(fetchMemberDetailSuccess(result.result))
        }
    }
}