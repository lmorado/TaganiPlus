import {
    RESET_MEMBER_TOTAL_OUTSTANDING
} from '../../constants/members'

const resetMemberTotalOutstandingState = (state) => ({
    type: RESET_MEMBER_TOTAL_OUTSTANDING, payload: state
})

export const resetMemberTotalOutstanding = () => {
    return dispatch => {
        dispatch(resetMemberTotalOutstandingState({ RESET_MEMBER_TOTAL_OUTSTANDING }))
    }
}
 