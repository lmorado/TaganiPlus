
import createIncomeReducer from './createIncome';
import { CREATE_INCOME_REQUEST, CREATE_INCOME_FAILED, CREATE_INCOME_SUCCESS } from '../../constants/reports'

describe('Create Income Reducer', () => {

    let initialState = {
        loading: false,
        error: false,
        response: '',
        success: false,
    }

    it('Should return default state', () => {

        const newState = createIncomeReducer(undefined, {});
        expect(newState).toEqual(initialState);
    });

    it('Should return loading state when requesting for the creation of bottle', () => {


        let expectedState = {
            ...initialState,
            loading: true,
            success: false,
            error: null,
        }

        const newState = createIncomeReducer(undefined, {
            type: CREATE_INCOME_REQUEST,
            payload: undefined
        });

        expect(newState).toEqual(expectedState);
    });


    it('Should return return an error when creationof bottle failed', () => {

        let payload = 'Page not found'

        let expectedState = {
            ...initialState,
            loading: false,
            success: false,
            error: payload
        }

        const newState = createIncomeReducer(undefined, {
            type: CREATE_INCOME_FAILED,
            payload: payload
        });

        expect(newState).toEqual(expectedState);
    });

});