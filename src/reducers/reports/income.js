import { GET_INCOME_REQUEST, GET_INCOME_FAILED, GET_INCOME_SUCCESS } from '../../constants/reports'
import { getLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    data: {}
}


const income = (state = initialState, action) => {
    switch (action.type) {
        case GET_INCOME_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case GET_INCOME_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_INCOME_SUCCESS:

            let incomes = getLocalStorage('incomesList') ? JSON.parse(localStorage.getItem('incomesList')) : []
            let filteredIncomeList = incomes
         
            if(action.payload) {
                filteredIncomeList = filteredIncomeList.filter(x=> parseInt(action.payload) === parseInt(x.id))
            }

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                data: filteredIncomeList.length > 0 ? filteredIncomeList[0] : {}
            }
            
        default:
            return state
    }
}

export default income