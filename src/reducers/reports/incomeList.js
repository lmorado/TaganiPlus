import { GET_INCOME_REQUEST, GET_INCOME_FAILED, GET_INCOME_SUCCESS } from '../../constants/reports'
import { getLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    data: getLocalStorage('incomeList') ? JSON.parse(localStorage.getItem('incomeList')) : [],
}


const incomeList = (state = initialState, action) => {
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

            let income = getLocalStorage('incomeList') ? JSON.parse(localStorage.getItem('incomeList')) : []
            let filteredIncomeList = income

            if(action.payload.year && action.payload.year !== 'all'){
                filteredIncomeList = filteredIncomeList.filter(x=> parseInt(x.acquiredDate) === parseInt(action.payload.year))
            }

            if(action.payload.name){
                filteredIncomeList = filteredIncomeList.filter(x=>x.incomeName.toLowerCase().includes(action.payload.name.toLowerCase()))
            }

            if(action.payload.vineyard && action.payload.vineyard !== 'all'){
                filteredIncomeList = filteredIncomeList.filter(x=>x.vineyard === action.payload.vineyard)
            }

            if(action.payload.sortOrder) {
                console.log('inside')
                if(action.payload.sortOrder === 'yearDescending'){
                    filteredIncomeList =  filteredIncomeList.sort((a,b) =>  {
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
                        filteredIncomeList =  filteredIncomeList.sort((a,b) =>  {
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
                data: filteredIncomeList
            }
        default:
            return state
    }
}

export default incomeList