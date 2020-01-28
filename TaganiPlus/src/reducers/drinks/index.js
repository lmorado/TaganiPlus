import { combineReducers } from 'redux'
import createDrinks from './createDrinks'
import drinksList from './drinksList'
import vineyardList from './vineyardList'
import yearList from './yearList'
import drink from './drink'

export default combineReducers({
    createDrinks,
    drinksList,
    vineyardList,
    yearList,
    drink
})