import {
    GET_EQUIPMENT_REQUEST,
    GET_EQUIPMENT_SUCCESS
} from '../../constants/equipments'

const getEquipmentRequest = () => ({
    type: GET_EQUIPMENT_REQUEST
})

const getEquipmentSuccess = (response) => ({
    type: GET_EQUIPMENT_SUCCESS, payload: response
})

export const getEquipment = (id) => {
    return async dispatch => {
        dispatch(getEquipmentRequest())
        dispatch(getEquipmentSuccess(id))
    }
}