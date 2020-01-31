import { CREATE_EQUIPMENTS_FAILED, CREATE_EQUIPMENTS_REQUEST, CREATE_EQUIPMENTS_SUCCESS, RESET_CREATE_EQUIPMENTS } from '../../constants/equipments'
import { getLocalStorage, saveLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    response: '',
    success: false,
}


const createEquipments = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_EQUIPMENTS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case CREATE_EQUIPMENTS_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case CREATE_EQUIPMENTS_SUCCESS:
            //save the equipments in local storage
            let equipments = getLocalStorage('equipmentsList') ? JSON.parse(localStorage.getItem('equipmentsList')) : []
            equipments.push({id : Math.floor(1000 + Math.random() * 9000), ...action.payload})
            saveLocalStorage('equipmentsList', equipments)

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                response: action.payload
            }

        case RESET_CREATE_EQUIPMENTS:

            return initialState

        default:
            return state
    }
}

export default createEquipments