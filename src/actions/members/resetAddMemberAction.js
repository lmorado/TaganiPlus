import {
    RESET_ADD_MEMBER_STATE
} from '../../constants/members'

const resetAddMemberState = (state) => ({
    type: RESET_ADD_MEMBER_STATE, payload: state
})

export const resetAddMember = () => {
    return async dispatch => {
        dispatch(resetAddMemberState({RESET_ADD_MEMBER_STATE}))
    }
}
