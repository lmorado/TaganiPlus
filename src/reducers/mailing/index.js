import { combineReducers } from 'redux';

import barangays from './barangays'
import provinces from './provinces'
import municipalities from './municipalities'

export default combineReducers({
    barangays,
    provinces,
    municipalities
});