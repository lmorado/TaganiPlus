import {
    FETCH_MEMBER_HIERARCHY_REQUEST,
    FETCH_MEMBER_HIERARCHY_FAILED,
    FETCH_MEMBER_HIERARCHY_SUCCESS
} from '../../constants/members'
import api from '../../services/api'

const fetchMemberHierarchyRequest = () => ({
    type: FETCH_MEMBER_HIERARCHY_REQUEST
})

const fetchMemberHierarchyFailed = (error) => ({
    type: FETCH_MEMBER_HIERARCHY_FAILED, payload: error
})

const fetchMemberHierarchySuccess = (response) => ({
    type: FETCH_MEMBER_HIERARCHY_SUCCESS, payload: response
})

export const getMemberHierarchy = (userId) => {
    return async dispatch => {
        dispatch(fetchMemberHierarchyRequest())
        const result = await api.Members.getPartnerHierarchy(userId)
        if(result.error) {
            const error = (result.data) ? result.data : 'Something went wrong...'
            dispatch(fetchMemberHierarchyFailed(error))
        } else {
            dispatch(fetchMemberHierarchySuccess(result.result))
        }
    }
}
