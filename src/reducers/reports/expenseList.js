import { GET_EXPENSE_REQUEST, GET_EXPENSE_FAILED, GET_EXPENSE_SUCCESS } from '../../constants/reports'
import { getLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    data: getLocalStorage('expenseList') ? JSON.parse(localStorage.getItem('expenseList')) : [],
}


const expenseList = (state = initialState, action) => {
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

            let expense = getLocalStorage('expenseList') ? JSON.parse(localStorage.getItem('expenseList')) : []
            let filteredExpenseList = expense

            if(action.payload.year && action.payload.year !== 'all'){
                filteredExpenseList = filteredExpenseList.filter(x=> parseInt(x.acquiredDate) === parseInt(action.payload.year))
            }

            if(action.payload.name){
                filteredExpenseList = filteredExpenseList.filter(x=>x.expenseName.toLowerCase().includes(action.payload.name.toLowerCase()))
            }

            if(action.payload.vineyard && action.payload.vineyard !== 'all'){
                filteredExpenseList = filteredExpenseList.filter(x=>x.vineyard === action.payload.vineyard)
            }

            if(action.payload.sortOrder) {
                console.log('inside')
                if(action.payload.sortOrder === 'yearDescending'){
                    filteredExpenseList =  filteredExpenseList.sort((a,b) =>  {
                            var nameA = parseInt(a.acquiredDate); 
                            var nameB = parseInt(b.acquiredDate); 
                        
                            if (nameA > nameB) {
                                return -1;
                            }
                            if (nameA < nameB) {
                                return 1;
                            }

                            return 0;
                    })

                }
                else if(action.payload.sortOrder === 'yearAscending'){
                        filteredExpenseList =  filteredExpenseList.sort((a,b) =>  {
                        var nameA = parseInt(a.acquiredDate); 
                        var nameB = parseInt(b.acquiredDate); 
                       
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }

                        return 0;
                   })
                }
            }

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                data: filteredExpenseList
            }
        default:
            return state
    }
}

export default expenseList