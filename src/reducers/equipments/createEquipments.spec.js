
import createEquipmentsReducer from './createEquipments';
import { CREATE_EQUIPMENTS_REQUEST, CREATE_EQUIPMENTS_FAILED, CREATE_EQUIPMENTS_SUCCESS } from '../../constants/bottles'

describe('Create Equipments Reducer', () => {

    let initialState = {
        loading: false,
        error: false,
        response: '',
        success: false,
    }

    it('Should return default state', () => {

        const newState = createEquipmentsReducer(undefined, {});
        expect(newState).toEqual(initialState);
    });

    it('Should return loading state when requesting for the creation of bottle', () => {


        let expectedState = {
            ...initialState,
            loading: true,
            success: false,
            error: null,
        }

        const newState = createEquipmentsReducer(undefined, {
            type: CREATE_EQUIPMENTS_REQUEST,
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

        const newState = createEquipmentsReducer(undefined, {
            type: CREATE_EQUIPMENTS_FAILED,
            payload: payload
        });

        expect(newState).toEqual(expectedState);
    });

});