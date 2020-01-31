import { GET_EQUIPMENTS_YEAR_EXPIRE_REQUEST, GET_EQUIPMENTS_YEAR_EXPIRE_FAILED, GET_EQUIPMENTS_YEAR_EXPIRE_SUCCESS } from '../../constants/equipments'
import { getLocalStorage } from '../../utils/localStorage'


let drinkList = getLocalStorage('equipmentsList') ? JSON.parse(localStorage.getItem('equipmentsList')) : []
let yearItems = []

yearItems = drinkList.map(x=> {
    return x.yearMade
})

const initialState = {
    loading: false,
    error: false,
    data: [...new Set(yearItems)],
}


const expDate = (state = initialState, action) => {
    switch (action.type) {
        case GET_EQUIPMENTS_YEAR_EXPIRE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case GET_EQUIPMENTS_YEAR_EXPIRE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_EQUIPMENTS_YEAR_EXPIRE_SUCCESS:

            let equipments = getLocalStorage('equipmentsList') ? JSON.parse(localStorage.getItem('equipmentsList')) : []
            let expDate = []

            expDate = equipments.map(x=> {
                return x.yearMade
            })

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                data: [...new Set(expDate)]
            }
        default:
            return state
    }
}

export default expDate