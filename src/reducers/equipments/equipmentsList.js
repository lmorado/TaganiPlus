import { GET_EQUIPMENTS_REQUEST, GET_EQUIPMENTS_FAILED, GET_EQUIPMENTS_SUCCESS } from '../../constants/equipments'
import { getLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    data: getLocalStorage('equipmentsList') ? JSON.parse(localStorage.getItem('equipmentsList')) : [],
}


const equipmentsList = (state = initialState, action) => {
    switch (action.type) {
        case GET_EQUIPMENTS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case GET_EQUIPMENTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_EQUIPMENTS_SUCCESS:

            let equipments = getLocalStorage('equipmentsList') ? JSON.parse(localStorage.getItem('equipmentsList')) : []
            let filteredEquipmentList = equipments

            if(action.payload.year && action.payload.year !== 'all'){
                filteredEquipmentList = filteredEquipmentList.filter(x=> parseInt(x.expDate) === parseInt(action.payload.year))
            }

            if(action.payload.name){
                filteredEquipmentList = filteredEquipmentList.filter(x=>x.equipmentName.toLowerCase().includes(action.payload.name.toLowerCase()))
            }

            if(action.payload.vineyard && action.payload.vineyard !== 'all'){
                filteredEquipmentList = filteredEquipmentList.filter(x=>x.vineyard === action.payload.vineyard)
            }

            if(action.payload.sortOrder) {
                console.log('inside')
                if(action.payload.sortOrder === 'yearDescending'){
                    filteredEquipmentList =  filteredEquipmentList.sort((a,b) =>  {
                            var nameA = parseInt(a.expDate); 
                            var nameB = parseInt(b.expDate); 
                        
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
                        filteredEquipmentList =  filteredEquipmentList.sort((a,b) =>  {
                        var nameA = parseInt(a.expDate); 
                        var nameB = parseInt(b.expDate); 
                       
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
                data: filteredEquipmentList
            }
        default:
            return state
    }
}

export default equipmentsList