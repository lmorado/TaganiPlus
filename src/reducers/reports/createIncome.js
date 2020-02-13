import { CREATE_INCOME_FAILED, CREATE_INCOME_REQUEST, CREATE_INCOME_SUCCESS, RESET_CREATE_INCOME } from '../../constants/reports'
import { getLocalStorage, saveLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    response: '',
    success: false,
}


const createIncome = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_INCOME_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case CREATE_INCOME_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case CREATE_INCOME_SUCCESS:
            //save the income in local storage
            let income = getLocalStorage('incomeList') ? JSON.parse(localStorage.getItem('incomeList')) : []
            income.push({id : Math.floor(1000 + Math.random() * 9000), ...action.payload})
            saveLocalStorage('incomeList', income)

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                response: action.payload
            }

        case RESET_CREATE_INCOME:

            return initialState

        default:
            return state
    }
}

export default createIncome