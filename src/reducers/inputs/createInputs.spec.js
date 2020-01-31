
import createInputsReducer from './createInputs';
import { CREATE_INPUTS_REQUEST, CREATE_INPUTS_FAILED, CREATE_INPUTS_SUCCESS } from '../../constants/bottles'

describe('Create Inputs Reducer', () => {

    let initialState = {
        loading: false,
        error: false,
        response: '',
        success: false,
    }

    it('Should return default state', () => {

        const newState = createInputsReducer(undefined, {});
        expect(newState).toEqual(initialState);
    });

    it('Should return loading state when requesting for the creation of bottle', () => {


        let expectedState = {
            ...initialState,
            loading: true,
            success: false,
            error: null,
        }

        const newState = createInputsReducer(undefined, {
            type: CREATE_INPUTS_REQUEST,
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

        const newState = createInputsReducer(undefined, {
            type: CREATE_INPUTS_FAILED,
            payload: payload
        });

        expect(newState).toEqual(expectedState);
    });

});