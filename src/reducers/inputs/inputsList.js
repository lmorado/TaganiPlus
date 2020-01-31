import { GET_INPUTS_REQUEST, GET_INPUTS_FAILED, GET_INPUTS_SUCCESS } from '../../constants/inputs'
import { getLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    data: getLocalStorage('inputsList') ? JSON.parse(localStorage.getItem('inputsList')) : [],
}


const inputsList = (state = initialState, action) => {
    switch (action.type) {
        case GET_INPUTS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case GET_INPUTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_INPUTS_SUCCESS:

            let inputs = getLocalStorage('inputsList') ? JSON.parse(localStorage.getItem('inputsList')) : []
            let filteredInputList = inputs

            if(action.payload.year && action.payload.year !== 'all'){
                filteredInputList = filteredInputList.filter(x=> parseInt(x.acquiredDate) === parseInt(action.payload.year))
            }

            if(action.payload.name){
                filteredInputList = filteredInputList.filter(x=>x.inputName.toLowerCase().includes(action.payload.name.toLowerCase()))
            }

            if(action.payload.vineyard && action.payload.vineyard !== 'all'){
                filteredInputList = filteredInputList.filter(x=>x.vineyard === action.payload.vineyard)
            }

            if(action.payload.sortOrder) {
                console.log('inside')
                if(action.payload.sortOrder === 'yearDescending'){
                    filteredInputList =  filteredInputList.sort((a,b) =>  {
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
                        filteredInputList =  filteredInputList.sort((a,b) =>  {
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
                data: filteredInputList
            }
        default:
            return state
    }
}

export default inputsList