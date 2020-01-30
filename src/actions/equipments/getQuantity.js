import {
    GET_EQUIPMENTS_QUANTITY_REQUEST,
    GET_EQUIPMENTS_QUANTITY_SUCCESS,
} from '../../constants/equipments'

const getEquipmentsQuantityRequest = () => ({
    type: GET_EQUIPMENTS_QUANTITY_REQUEST
})


const getEquipmentsQuantitySuccess = (response) => ({
    type: GET_EQUIPMENTS_QUANTITY_SUCCESS, payload: response
})

export const getEquipmentsQuantitys = () => {
    return async dispatch => {
        dispatch(getEquipmentsQuantityRequest())
        dispatch(getEquipmentsQuantitySuccess())
    }
}