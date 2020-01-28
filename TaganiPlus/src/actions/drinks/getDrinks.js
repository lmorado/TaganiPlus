import {
    GET_DRINKS_REQUEST,
    GET_DRINKS_SUCCESS,
    GET_DRINKS_FAILED,
} from '../../constants/drinks'

const getDrinksRequest = () => ({
    type: GET_DRINKS_REQUEST
})

const getDrinksFailed = (error) => ({
    type: GET_DRINKS_FAILED, payload: error
})

const getDrinksSuccess = (response) => ({
    type: GET_DRINKS_SUCCESS, payload: response
})

export const getDrinks = (name = '', vineyard = '', year = '', sortOrder='') => {
    return async dispatch => {
        dispatch(getDrinksRequest())
        let storedDrinks = { name : name , vineyard : vineyard, year : year, sortOrder : sortOrder}
        if (!storedDrinks) {
            const errormsg = 'Error 500'
            dispatch(getDrinksFailed(errormsg))
        } else {
            dispatch(getDrinksSuccess(storedDrinks))
        }
    }
}