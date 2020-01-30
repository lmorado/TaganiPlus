import {
    GET_EQUIPMENTS_REQUEST,
    GET_EQUIPMENTS_SUCCESS,
    GET_EQUIPMENTS_FAILED,
} from '../../constants/equipments'

const getEquipmentsRequest = () => ({
    type: GET_EQUIPMENTS_REQUEST
})

const getEquipmentsFailed = (error) => ({
    type: GET_EQUIPMENTS_FAILED, payload: error
})

const getEquipmentsSuccess = (response) => ({
    type: GET_EQUIPMENTS_SUCCESS, payload: response
})

export const getEquipments = (name = '', vendor = '', cost = '', year = '', sortOrder='') => {
    return async dispatch => {
        dispatch(getEquipmentsRequest())
        let storedEquipments = { name : name , vendor : vendor, cost : cost, year : year, sortOrder : sortOrder}
        if (!storedEquipments) {
            const errormsg = 'Error 500'
            dispatch(getEquipmentsFailed(errormsg))
        } else {
            dispatch(getEquipmentsSuccess(storedEquipments))
        }
    }
}