import { combineReducers } from 'redux'
import createEquipments from './createEquipments'
import equipmentsList from './equipmentsList'
import expDate from './expDate'
import equipment from './equipment'

export default combineReducers({
    createEquipments,
    equipmentsList,
    expDate,
    equipment
})