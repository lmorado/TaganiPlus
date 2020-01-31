import {
    CREATE_EQUIPMENT_REQUEST ,
    CREATE_EQUIPMENT_FAILED,
    CREATE_EQUIPMENT_SUCCESS ,
} from '../../constants/equipment'

const initialState = {
    loading: false,
    error: false,
    errorMsg: '',
    success: false
}

const createEquipmentReducer = (state = initialState, action) => {

    switch (action.type) {
        case CREATE_EQUIPMENT_REQUEST :
            return {
                ...state,
                loading: true,
            }
        case CREATE_EQUIPMENT_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload
            }
        case CREATE_EQUIPMENT_SUCCESS :
            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                errorMsg: action.payload
            }
        case RESET_CREATE_EQUIPMENT: // gawa ka nalang nito. 
            return initialState
        default:
            return state
    }
}

export default createEquipmentReducer