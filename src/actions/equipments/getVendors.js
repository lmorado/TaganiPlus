import {
    GET_EQUIPMENTS_VENDOR_REQUEST,
    GET_EQUIPMENTS_VENDOR_SUCCESS,
} from '../../constants/equipments'

const getEquipmentsVendorRequest = () => ({
    type: GET_EQUIPMENTS_VENDOR_REQUEST
})


const getEquipmentsVendorSuccess = (response) => ({
    type: GET_EQUIPMENTS_VENDOR_SUCCESS, payload: response
})

export const getEquipmentsVendors = () => {
    return async dispatch => {
        dispatch(getEquipmentsVendorRequest())
        dispatch(getEquipmentsVendorSuccess())
    }
}