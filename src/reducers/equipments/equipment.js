import { GET_EQUIPMENT_REQUEST, GET_EQUIPMENT_FAILED, GET_EQUIPMENT_SUCCESS } from '../../constants/equipments'
import { getLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    data: {}
}


const equipment = (state = initialState, action) => {
    switch (action.type) {
        case GET_EQUIPMENT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case GET_EQUIPMENT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_EQUIPMENT_SUCCESS:

            let equipments = getLocalStorage('equipmentsList') ? JSON.parse(localStorage.getItem('equipmentsList')) : []
            let filteredEquipmentList = equipments
         
            if(action.payload) {
                filteredEquipmentList = filteredEquipmentList.filter(x=> parseInt(action.payload) === parseInt(x.id))
            }

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                data: filteredEquipmentList.length > 0 ? filteredEquipmentList[0] : {}
            }
            
        default:
            return state
    }
}

export default equipment