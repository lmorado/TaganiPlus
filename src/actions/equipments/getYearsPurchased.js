import {
    GET_EQUIPMENTS_YEAR_PURCHASED_REQUEST,
    GET_EQUIPMENTS_YEAR_PURCHASED_SUCCESS,
} from '../../constants/equipments'

const getEquipmentsYearPurchasedRequest = () => ({
    type: GET_EQUIPMENTS_YEAR_PURCHASED_REQUEST
})


const getEquipmentsYearPurchasedSuccess = (response) => ({
    type: GET_EQUIPMENTS_YEAR_PURCHASED_SUCCESS, payload: response
})

export const getEquipmentsYearPurchased = () => {
    return async dispatch => {
        dispatch(getEquipmentsYearPurchasedRequest())
        dispatch(getEquipmentsYearPurchasedSuccess())
    }
}