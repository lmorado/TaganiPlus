import {
    RESET_USERLIST
} from '../../constants/members'

const resetUserListState = (state) => ({
    type: RESET_USERLIST, payload: state
})

export const resetUserList = () => {
    return dispatch => {
        dispatch(resetUserListState({ RESET_USERLIST }))
    }
}
