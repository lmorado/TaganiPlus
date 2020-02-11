import {
    FETCH_MEMBER_HIERARCHY_REQUEST,
    FETCH_MEMBER_HIERARCHY_FAILED,
    FETCH_MEMBER_HIERARCHY_SUCCESS
} from '../../constants/members'

const initialState = {
    loading: false,
    error: false,
    hierarchy: []
}

const membersHierarchyReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MEMBER_HIERARCHY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_MEMBER_HIERARCHY_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }
        case FETCH_MEMBER_HIERARCHY_SUCCESS:
			return {
				...state,
				loading: false,
				error: false,
				hierarchy: action.payload
			}
        default:
            return state
    }
}

export default membersHierarchyReducer
