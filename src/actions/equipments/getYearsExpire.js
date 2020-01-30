import {
    GET_EQUIPMENTS_YEAR_EXPIRE_REQUEST,
    GET_EQUIPMENTS_YEAR_EXPIRE_SUCCESS,
} from '../../constants/equipments'

const getEquipmentsYearExpireRequest = () => ({
    type: GET_EQUIPMENTS_YEAR_EXPIRE_REQUEST
})


const getEquipmentsYearExpireSuccess = (response) => ({
    type: GET_EQUIPMENTS_YEAR_EXPIRE_SUCCESS, payload: response
})

export const getEquipmentsYearExpire = () => {
    return async dispatch => {
        dispatch(getEquipmentsYearExpireRequest())
        dispatch(getEquipmentsYearExpireSuccess())
    }
}