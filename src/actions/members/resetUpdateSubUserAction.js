import {
    RESET_UPDATE_SUBUSER_STATE
} from '../../constants/members'

const resetUpdateSubuserState = (state) => ({
    type: RESET_UPDATE_SUBUSER_STATE, payload: state
})

export const resetUpdateSubUser = () => {
    return dispatch => {
        dispatch(resetUpdateSubuserState({RESET_UPDATE_SUBUSER_STATE}))
    }
}
