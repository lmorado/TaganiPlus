import {
    FETCH_CREATE_MEMBER_REQUEST,
    FETCH_CREATE_MEMBER_FAILED,
    FETCH_CREATE_MEMBER_SUCCESS
} from '../../constants/members'
import api from '../../services/api'


const fetchCreateDetailsFailed = (error) => ({
    type: FETCH_CREATE_MEMBER_FAILED, payload: error
})

const fetchCreateDetailsSuccess = (response) => ({
    type: FETCH_CREATE_MEMBER_SUCCESS, payload: response
})

export const getCreateMemberSetup = (id, userType) => {
    return async dispatch => {
        const result = await api.Members.getUserSetup(id, userType)
        if (result.error) {
            const errormsg = result.data ? result.data : 'Something went wrong...'
            dispatch(fetchCreateDetailsFailed(errormsg))
        } else {
            dispatch(fetchCreateDetailsSuccess(result.result))
        }
    }
}