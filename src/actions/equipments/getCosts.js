import {
    GET_EQUIPMENTS_COST_REQUEST,
    GET_EQUIPMENTS_COST_SUCCESS,
} from '../../constants/equipments'

const getEquipmentsCostRequest = () => ({
    type: GET_EQUIPMENTS_COST_REQUEST
})


const getEquipmentsCostSuccess = (response) => ({
    type: GET_EQUIPMENTS_COST_SUCCESS, payload: response
})

export const getEquipmentsCosts = () => {
    return async dispatch => {
        dispatch(getEquipmentsCostRequest())
        dispatch(getEquipmentsCostSuccess())
    }
}