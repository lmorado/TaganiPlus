import { CREATE_DRINKS_FAILED, CREATE_DRINKS_REQUEST, CREATE_DRINKS_SUCCESS, RESET_CREATE_DRINKS } from '../../constants/drinks'
import { getLocalStorage, saveLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    response: '',
    success: false,
}


const createDrinks = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_DRINKS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case CREATE_DRINKS_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case CREATE_DRINKS_SUCCESS:
            //save the drinks in local storage
            let drinks = getLocalStorage('drinksList') ? JSON.parse(localStorage.getItem('drinksList')) : []
            drinks.push({id : Math.floor(1000 + Math.random() * 9000), ...action.payload})
            saveLocalStorage('drinksList', drinks)

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                response: action.payload
            }

        case RESET_CREATE_DRINKS:

            return initialState

        default:
            return state
    }
}

export default createDrinks