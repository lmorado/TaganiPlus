import { GET_DRINKS_YEAR_REQUEST, GET_DRINKS_YEAR_FAILED, GET_DRINKS_YEAR_SUCCESS } from '../../constants/drinks'
import { getLocalStorage } from '../../utils/localStorage'


let drinkList = getLocalStorage('drinksList') ? JSON.parse(localStorage.getItem('drinksList')) : []
let yearItems = []

yearItems = drinkList.map(x=> {
    return x.yearMade
})

const initialState = {
    loading: false,
    error: false,
    data: [...new Set(yearItems)],
}


const yearList = (state = initialState, action) => {
    switch (action.type) {
        case GET_DRINKS_YEAR_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case GET_DRINKS_YEAR_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_DRINKS_YEAR_SUCCESS:

            let drinks = getLocalStorage('drinksList') ? JSON.parse(localStorage.getItem('drinksList')) : []
            let yearList = []

            yearList = drinks.map(x=> {
                return x.yearMade
            })

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                data: [...new Set(yearList)]
            }
        default:
            return state
    }
}

export default yearList