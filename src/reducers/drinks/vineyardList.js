import { GET_DRINKS_VINEYARD_REQUEST, GET_DRINKS_VINEYARD_FAILED, GET_DRINKS_VINEYARD_SUCCESS } from '../../constants/drinks'
import { getLocalStorage } from '../../utils/localStorage'

let drinkList = getLocalStorage('drinksList') ? JSON.parse(localStorage.getItem('drinksList')) : []
let vineyardItems = []

vineyardItems = drinkList.map(x=> {
    return x.vineyard
})

const initialState = {
    loading: false,
    error: false,
    data: [...new Set(vineyardItems)],
}


const vineyardList = (state = initialState, action) => {
    switch (action.type) {
        case GET_DRINKS_VINEYARD_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case GET_DRINKS_VINEYARD_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_DRINKS_VINEYARD_SUCCESS:

            let drinks = getLocalStorage('drinksList') ? JSON.parse(localStorage.getItem('drinksList')) : []
            let vineyardList = []

            vineyardList = drinks.map(x=> {
                return x.vineyard
            })

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                data: [...new Set(vineyardList)]
            }

        default:
            return state
    }
}

export default vineyardList