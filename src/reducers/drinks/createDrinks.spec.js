
import createDrinksReducer from './createDrinks';
import { CREATE_DRINKS_REQUEST, CREATE_DRINKS_FAILED, CREATE_DRINKS_SUCCESS } from '../../constants/bottles'

describe('Create Drinks Reducer', () => {

    let initialState = {
        loading: false,
        error: false,
        response: '',
        success: false,
    }

    it('Should return default state', () => {

        const newState = createDrinksReducer(undefined, {});
        expect(newState).toEqual(initialState);
    });

    it('Should return loading state when requesting for the creation of bottle', () => {


        let expectedState = {
            ...initialState,
            loading: true,
            success: false,
            error: null,
        }

        const newState = createDrinksReducer(undefined, {
            type: CREATE_DRINKS_REQUEST,
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

        const newState = createDrinksReducer(undefined, {
            type: CREATE_DRINKS_FAILED,
            payload: payload
        });

        expect(newState).toEqual(expectedState);
    });

});