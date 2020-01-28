import { GET_DRINK_REQUEST, GET_DRINK_FAILED, GET_DRINK_SUCCESS } from '../../constants/drinks'
import { getLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    data: {}
}


const drink = (state = initialState, action) => {
    switch (action.type) {
        case GET_DRINK_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case GET_DRINK_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_DRINK_SUCCESS:

            let drinks = getLocalStorage('drinksList') ? JSON.parse(localStorage.getItem('drinksList')) : []
            let filteredDrinkList = drinks
         
            if(action.payload) {
                filteredDrinkList = filteredDrinkList.filter(x=> parseInt(action.payload) === parseInt(x.id))
            }

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                data: filteredDrinkList.length > 0 ? filteredDrinkList[0] : {}
            }
            
        default:
            return state
    }
}

export default drink