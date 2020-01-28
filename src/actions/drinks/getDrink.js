import {
    GET_DRINK_REQUEST,
    GET_DRINK_SUCCESS
} from '../../constants/drinks'

const getDrinkRequest = () => ({
    type: GET_DRINK_REQUEST
})

const getDrinkSuccess = (response) => ({
    type: GET_DRINK_SUCCESS, payload: response
})

export const getDrink = (id) => {
    return async dispatch => {
        dispatch(getDrinkRequest())
        dispatch(getDrinkSuccess(id))
    }
}