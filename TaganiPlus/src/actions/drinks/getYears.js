import {
    GET_DRINKS_YEAR_REQUEST,
    GET_DRINKS_YEAR_SUCCESS,
} from '../../constants/drinks'

const getDrinksYearRequest = () => ({
    type: GET_DRINKS_YEAR_REQUEST
})


const getDrinksYearSuccess = (response) => ({
    type: GET_DRINKS_YEAR_SUCCESS, payload: response
})

export const getDrinksYear = () => {
    return async dispatch => {
        dispatch(getDrinksYearRequest())
        dispatch(getDrinksYearSuccess())
    }
}