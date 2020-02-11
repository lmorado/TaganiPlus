import {
    FETCH_PTSETTING_REQUEST,
    FETCH_PTSETTING_FAILED,
    FETCH_PTSETTING_SUCCESS,
    EDIT_PTSETTING_REQUEST,
    EDIT_PTSETTING_FAILED,
    EDIT_PTSETTING_SUCCESS
} from '../../constants/members'
import api from '../../services/api'


const fetchPtSettingRequest = (type) => ({ type: FETCH_PTSETTING_REQUEST, payload: type })
const fetchPtSettingFailed = (error) => ({ type: FETCH_PTSETTING_FAILED, payload: error })
const fetchPtSettingSuccess = (response) => ({ type: FETCH_PTSETTING_SUCCESS, payload: response })

const editPtSettingRequest = (type) => ({ type: EDIT_PTSETTING_REQUEST, payload: type })
const editPtSettingFailed = (error) => ({ type: EDIT_PTSETTING_FAILED, payload: error })
const editPtSettingSuccess = (response) => ({ type: EDIT_PTSETTING_SUCCESS, payload: response })

export const getPtSetting = (page, pageSize, categoryId, subCategoryId) => {
    return async dispatch => {
        dispatch(fetchPtSettingRequest('PTSETTING_REQUEST'))
        const result = await api.Members.getPtSetting(page, pageSize, categoryId, subCategoryId)
        if (result.error) {
            const errormsg = result.data ? result.data : 'Something went wrong...'
            dispatch(fetchPtSettingFailed(errormsg))
        } else {
            const data = (result) ? result.result : ''
            dispatch(fetchPtSettingSuccess(data))


        }
    }
}
export const editPtSetting = (data, page, pageSize) => {

    return async dispatch => {
        dispatch(editPtSettingRequest('EDIT_PTSETTING_REQUEST'))
        const result = await api.Members.editPtSetting(data)
        if (result.statusCode == 200) {
            dispatch(editPtSettingSuccess(result.statusName))
            dispatch(getPtSetting(page, pageSize, data.categoryId, data.subCategoryId))
        }
        else {
            dispatch(editPtSettingFailed(result.statusName ? result.statusName : result.data.statusName))
        }
    }
}

