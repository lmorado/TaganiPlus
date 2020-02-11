import {
    UPDATE_USER_STATUS_REQUEST,
    UPDATE_USER_STATUS_FAILED,
    UPDATE_USER_STATUS_SUCCESS
} from '../../constants/members'
import api from '../../services/api'

const updateStatusRequest = () => ({
    type: UPDATE_USER_STATUS_REQUEST
})

const updateStatusFailed = (error) => ({
    type: UPDATE_USER_STATUS_FAILED, payload: error
})

const updateStatusSuccess = (response) =>({
    type: UPDATE_USER_STATUS_SUCCESS, payload: response
})

export const updateUserStatus = (id,status,modifiedBy) => {
    return async dispatch => {
        dispatch(updateStatusRequest())
        const result = await api.Members.updateUserStatus(id,status,modifiedBy)
        if(result.error) {
            const error = result.data ? result.data : 'Something went wrong...'
            dispatch(updateStatusFailed(error))
        } else {
            const data = (result) ? result.result : ''
            dispatch(updateStatusSuccess(data))
        }
    }
}
