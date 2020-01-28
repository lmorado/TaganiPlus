import {
    GET_DRINKS_VINEYARD_REQUEST,
    GET_DRINKS_VINEYARD_SUCCESS,
} from '../../constants/drinks'

const getDrinksVineyardRequest = () => ({
    type: GET_DRINKS_VINEYARD_REQUEST
})


const getDrinksVineyardSuccess = (response) => ({
    type: GET_DRINKS_VINEYARD_SUCCESS, payload: response
})

export const getDrinksVineyard = () => {
    return async dispatch => {
        dispatch(getDrinksVineyardRequest())
        dispatch(getDrinksVineyardSuccess())
    }
}