import {
    CREATE_EQUIPMENTS_REQUEST,
    CREATE_EQUIPMENTS_SUCCESS,
    CREATE_EQUIPMENTS_FAILED,
    RESET_CREATE_EQUIPMENTS
} from '../../constants/equipments'


const createEquipmentsRequest = () => ({
    type: CREATE_EQUIPMENTS_REQUEST
})

const createEquipmentsFailed = (error) => ({
    type: CREATE_EQUIPMENTS_FAILED, payload: error
})

const createEquipmentsSuccess = (response) => ({
    type: CREATE_EQUIPMENTS_SUCCESS, payload: response
})

const resetCreateEquipmentsRequest = () => ({
    type: RESET_CREATE_EQUIPMENTS
})


export const createEquipments = (data) => {
    return dispatch => {
        dispatch(createEquipmentsRequest())
        let storedEquipments = data
        if (!storedEquipments) {
            const errormsg = 'Error 500'
            dispatch(createEquipmentsFailed(errormsg))
        } else {
            dispatch(createEquipmentsSuccess(storedEquipments))
        }
    }
}

export const resetCreateEquipments = () => {
    return dispatch => {
        dispatch(resetCreateEquipmentsRequest())
    }
}