import { GET_DRINKS_REQUEST, GET_DRINKS_FAILED, GET_DRINKS_SUCCESS } from '../../constants/drinks'
import { getLocalStorage } from '../../utils/localStorage'


const initialState = {
    loading: false,
    error: false,
    data: getLocalStorage('drinksList') ? JSON.parse(localStorage.getItem('drinksList')) : [],
}


const drinksList = (state = initialState, action) => {
    switch (action.type) {
        case GET_DRINKS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: null,
            }
        case GET_DRINKS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_DRINKS_SUCCESS:

            let drinks = getLocalStorage('drinksList') ? JSON.parse(localStorage.getItem('drinksList')) : []
            let filteredDrinkList = drinks

            if(action.payload.year && action.payload.year !== 'all'){
                filteredDrinkList = filteredDrinkList.filter(x=> parseInt(x.yearMade) === parseInt(action.payload.year))
            }

            if(action.payload.name){
                filteredDrinkList = filteredDrinkList.filter(x=>x.drinkName.toLowerCase().includes(action.payload.name.toLowerCase()))
            }

            if(action.payload.vineyard && action.payload.vineyard !== 'all'){
                filteredDrinkList = filteredDrinkList.filter(x=>x.vineyard === action.payload.vineyard)
            }

            if(action.payload.sortOrder) {
                console.log('inside')
                if(action.payload.sortOrder === 'vineyardDescending'){
                 filteredDrinkList =  filteredDrinkList.sort((a,b) =>  {
                        var nameA = a.vineyard.toUpperCase(); 
                        var nameB = b.vineyard.toUpperCase(); 
                       
                        if (nameA > nameB) {
                            return -1;
                        }
                        if (nameA < nameB) {
                            return 1;
                        }

                        return 0;
                })

                }else if(action.payload.sortOrder === 'vineyardAscending'){
                filteredDrinkList =  filteredDrinkList.sort((a,b) =>  {
                        var nameA = a.vineyard.toUpperCase(); 
                        var nameB = b.vineyard.toUpperCase(); 
                       
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }

                        return 0;
                })
                }else if(action.payload.sortOrder === 'yearDescending'){
                    filteredDrinkList =  filteredDrinkList.sort((a,b) =>  {
                            var nameA = parseInt(a.yearMade); 
                            var nameB = parseInt(b.yearMade); 
                        
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
                        filteredDrinkList =  filteredDrinkList.sort((a,b) =>  {
                        var nameA = parseInt(a.yearMade); 
                        var nameB = parseInt(b.yearMade); 
                       
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
                data: filteredDrinkList
            }
        default:
            return state
    }
}

export default drinksList