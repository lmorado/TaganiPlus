import {
    FETCH_NEW_USERS_REQUEST,
    FETCH_NEW_USERS_FAILED,
    FETCH_NEW_USERS_SUCCESS
} from '../../constants/members'
import api from '../../services/api'

const fetchNewUsersRequest = () => ({
    type: FETCH_NEW_USERS_REQUEST
})

const fetchNewUsersFailed = (error) => ({
    type: FETCH_NEW_USERS_FAILED, payload: error
})

const fetchNewUsersSuccess = (response) => ({
    type: FETCH_NEW_USERS_SUCCESS, payload: response
})

export const getMemberNewUsers = (userId,userTypeId) => {
    return async dispatch => {
        dispatch(fetchNewUsersRequest())
        const result = await api.Members.getNewUsers(userId,userTypeId)
        if(result.error) {
            const error = (result.data) ? result.data : 'Something went wrong...'
            dispatch(fetchNewUsersFailed(error))
        } else {
            dispatch(fetchNewUsersSuccess(result.result))
        }
    }
}