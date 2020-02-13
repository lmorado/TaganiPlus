import { CREATE_EXPENSE_FAILED, CREATE_EXPENSE_REQUEST, CREATE_EXPENSE_SUCCESS, RESET_CREATE_EXPENSE } from '../../constants/reports'
import { getLocalStorage, saveLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    response: '',
    success: false,
}


const createExpense = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_EXPENSE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case CREATE_EXPENSE_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            }
        case CREATE_EXPENSE_SUCCESS:
            //save the expense in local storage
            let expense = getLocalStorage('expenseList') ? JSON.parse(localStorage.getItem('expenseList')) : []
            expense.push({id : Math.floor(1000 + Math.random() * 9000), ...action.payload})
            saveLocalStorage('expenseList', expense)

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                response: action.payload
            }

        case RESET_CREATE_EXPENSE:

            return initialState

        default:
            return state
    }
}

export default createExpense