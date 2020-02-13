import {
    FETCH_MEMBER_TOTAL_OUTSTANDING_REQUEST,
    FETCH_MEMBER_TOTAL_OUTSTANDING_SUCCESS,
    FETCH_MEMBER_TOTAL_OUTSTANDING_FAILED
} from '../../constants/members'
import api from '../../services/api'



const fetchTotalOutstandingRequest = () => ({ type: FETCH_MEMBER_TOTAL_OUTSTANDING_REQUEST })

const fetchTotalOutstandingFailed = (error) => ({ type: FETCH_MEMBER_TOTAL_OUTSTANDING_FAILED, payload: error })

const fetchTotalOutstandingSuccess = (response) => ({ type: FETCH_MEMBER_TOTAL_OUTSTANDING_SUCCESS, payload: response })

export const getOutstandingBets = (userId, page, pageSize) => {
    return async dispatch => {
        dispatch(fetchTotalOutstandingRequest())
        const result = await api.TotalBets.getOutstanding(userId, page, pageSize)
        if (result.error) {
            const errormsg = result. data ? result.data : 'Something went wrong...'
            dispatch(fetchTotalOutstandingFailed(errormsg))
        } else {
            dispatch(fetchTotalOutstandingSuccess(result.result))
        }
    }
}


