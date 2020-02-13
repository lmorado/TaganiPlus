import { GET_EXPENSE_REQUEST, GET_EXPENSE_FAILED, GET_EXPENSE_SUCCESS } from '../../constants/reports'
import { getLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    data: {}
}


const expense = (state = initialState, action) => {
    switch (action.type) {
        case GET_EXPENSE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case GET_EXPENSE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_EXPENSE_SUCCESS:

            let expenses = getLocalStorage('expensesList') ? JSON.parse(localStorage.getItem('expensesList')) : []
            let filteredExpenseList = expenses
         
            if(action.payload) {
                filteredExpenseList = filteredExpenseList.filter(x=> parseInt(action.payload) === parseInt(x.id))
            }

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                data: filteredExpenseList.length > 0 ? filteredExpenseList[0] : {}
            }
            
        default:
            return state
    }
}

export default expense