import {
    RESET_COPY_USER,
    RESET_ADD_COPY_USER
} from '../../constants/members'

const resetCopyUserState = (state) => ({
    type: RESET_COPY_USER, payload: state
})

const resetAddCopyUserState = (state) => ({
    type: RESET_ADD_COPY_USER, payload: state
})

export const resetCopyUser = () => {
    return dispatch => {
        dispatch(resetCopyUserState({ RESET_COPY_USER }))
        dispatch(resetAddCopyUserState({ RESET_ADD_COPY_USER }))
    }
}
