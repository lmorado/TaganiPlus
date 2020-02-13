import {
    FETCH_PTSETTING_REQUEST,
    FETCH_PTSETTING_FAILED,
    FETCH_PTSETTING_SUCCESS,
    RESET_PTSETTING,
    EDIT_PTSETTING_REQUEST,
    EDIT_PTSETTING_FAILED,
    EDIT_PTSETTING_SUCCESS,
    RESET_PTSETTING_EDIT
} from '../../constants/members'

const initialState = {
    loading: false,
    error: false,
    message: '',
    data: [],
    editStatus: false,
}

const ptSettingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PTSETTING_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_PTSETTING_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }
        case FETCH_PTSETTING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload
            }
        case RESET_PTSETTING:
            return {
                ...state,
                loading: false,
                error: false,
                message: '',
                data: []
            }
        case EDIT_PTSETTING_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case EDIT_PTSETTING_FAILED:
            return {
                ...state,
                loading: false,
                editStatus: action.payload,
            }
        case EDIT_PTSETTING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                editStatus: action.payload
            }
        case RESET_PTSETTING_EDIT:
            return {
                ...state,
                editStatus: false
            }
        default:
            return state
    }
}

export default ptSettingReducer