import {
    RESET_ADD_SUBUSER_STATE
} from '../../constants/members'

const resetAddSubuserState = (state) => ({
    type: RESET_ADD_SUBUSER_STATE, payload: state
})

export const resetAddSubUser = () => {
    return async dispatch => {
        dispatch(resetAddSubuserState({RESET_ADD_SUBUSER_STATE}))
    }
}
