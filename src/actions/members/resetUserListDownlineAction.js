import {
    RESET_DOWNLINE_USERLIST
} from '../../constants/members'

const resetUserListDownlineState = (state) => ({
    type: RESET_DOWNLINE_USERLIST, payload: state
})

export const resetUserListDownline = () => {
    return dispatch => {
        dispatch(resetUserListDownlineState({ RESET_DOWNLINE_USERLIST }))
    }
}
