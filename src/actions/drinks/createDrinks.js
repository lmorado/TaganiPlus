import {
    CREATE_DRINKS_REQUEST,
    CREATE_DRINKS_SUCCESS,
    CREATE_DRINKS_FAILED,
    RESET_CREATE_DRINKS
} from '../../constants/drinks'


const createDrinksRequest = () => ({
    type: CREATE_DRINKS_REQUEST
})

const createDrinksFailed = (error) => ({
    type: CREATE_DRINKS_FAILED, payload: error
})

const createDrinksSuccess = (response) => ({
    type: CREATE_DRINKS_SUCCESS, payload: response
})

const resetCreateDrinksRequest = () => ({
    type: RESET_CREATE_DRINKS
})


export const createDrinks = (data) => {
    return dispatch => {
        dispatch(createDrinksRequest())
        let storedDrinks = data
        if (!storedDrinks) {
            const errormsg = 'Error 500'
            dispatch(createDrinksFailed(errormsg))
        } else {
            dispatch(createDrinksSuccess(storedDrinks))
        }
    }
}

export const resetCreateDrinks = () => {
    return dispatch => {
        dispatch(resetCreateDrinksRequest())
    }
}