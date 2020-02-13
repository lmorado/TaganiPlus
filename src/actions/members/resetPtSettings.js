import {
    RESET_PTSETTING,RESET_PTSETTING_EDIT
} from '../../constants/members'

const resetPTSettingState = (state) => ({
    type: RESET_PTSETTING, payload: state
})

const resetPTSettingEditState = (state) => ({
    type:RESET_PTSETTING_EDIT, payload: state
})

export const resetPTSetting = () => {
    return dispatch => {
        dispatch(resetPTSettingState({RESET_PTSETTING}))
    }
}

export const resetPTSettingEdit = () => {
    return dispatch => {
        dispatch(resetPTSettingEditState({RESET_PTSETTING_EDIT}))
    }
}
