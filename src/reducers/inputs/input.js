import { GET_INPUT_REQUEST, GET_INPUT_FAILED, GET_INPUT_SUCCESS } from '../../constants/inputs'
import { getLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    data: {}
}


const input = (state = initialState, action) => {
    switch (action.type) {
        case GET_INPUT_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case GET_INPUT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_INPUT_SUCCESS:

            let inputs = getLocalStorage('inputsList') ? JSON.parse(localStorage.getItem('inputsList')) : []
            let filteredInputList = inputs
         
            if(action.payload) {
                filteredInputList = filteredInputList.filter(x=> parseInt(action.payload) === parseInt(x.id))
            }

            return {
                ...state,
                loading: false,
                success: true,
                error: false,
                data: filteredInputList.length > 0 ? filteredInputList[0] : {}
            }
            
        default:
            return state
    }
}

export default input