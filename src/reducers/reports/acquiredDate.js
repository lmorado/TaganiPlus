import { GET_INPUTS_YEAR_ACQUIRED_REQUEST, GET_INPUTS_YEAR_ACQUIRED_FAILED, GET_INPUTS_YEAR_ACQUIRED_SUCCESS } from '../../constants/inputs'
import { getLocalStorage } from '../../utils/localStorage'


let drinkList = getLocalStorage('inputsList') ? JSON.parse(localStorage.getItem('inputsList')) : []
let yearItems = []

yearItems = drinkList.map(x=> {
    return x.yearMade
})

const initialState = {
    loading: false,
    error: false,
    data: [...new Set(yearItems)],
}


const acquiredDate = (state = initialState, action) => {
    switch (action.type) {
        case GET_INPUTS_YEAR_ACQUIRED_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case GET_INPUTS_YEAR_ACQUIRED_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_INPUTS_YEAR_ACQUIRED_SUCCESS:

            let inputs = getLocalStorage('inputsList') ? JSON.parse(localStorage.getItem('inputsList')) : []
            let acquiredDate = []

            acquiredDate = inputs.map(x=> {
                return x.yearMade
            })

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                data: [...new Set(acquiredDate)]
            }
        default:
            return state
    }
}

export default acquiredDate