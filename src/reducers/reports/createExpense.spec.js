
import createExpenseReducer from './createExpense';
import { CREATE_EXPENSE_REQUEST, CREATE_EXPENSE_FAILED, CREATE_EXPENSE_SUCCESS } from '../../constants/reports'

describe('Create Expense Reducer', () => {

    let initialState = {
        loading: false,
        error: false,
        response: '',
        success: false,
    }

    it('Should return default state', () => {

        const newState = createExpenseReducer(undefined, {});
        expect(newState).toEqual(initialState);
    });

    it('Should return loading state when requesting for the creation of bottle', () => {


        let expectedState = {
            ...initialState,
            loading: true,
            success: false,
            error: null,
        }

        const newState = createExpenseReducer(undefined, {
            type: CREATE_EXPENSE_REQUEST,
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

        const newState = createExpenseReducer(undefined, {
            type: CREATE_EXPENSE_FAILED,
            payload: payload
        });

        expect(newState).toEqual(expectedState);
    });

});