import {
    FETCH_AGENTS_REQUEST,
    FETCH_AGENTS_FAILED,
    FETCH_AGENTS_SUCCESS,
    RESET_USERLIST
} from '../../constants/members'

const initialState = {
    loading: false,
    error: false,
    agents: [],
    message: '',
    requestType: ''
}

const membersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AGENTS_REQUEST:
            return {
                ...state,
                loading: true,
                requestType: action.payload
            }
        case FETCH_AGENTS_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }
        case FETCH_AGENTS_SUCCESS:
            if (action.isScroll === true) {
                let agents = state.agents
                let payload = action.payload
                payload.data = agents.data.concat(action.payload.data)

                return {
                    ...state,
                    loading: false,
                    error: false,
                    agents: payload
                }
            } else {
                return {
                    ...state,
                    loading: false,
                    error: false,
                    agents: action.payload
                }
            }
        case RESET_USERLIST: {
            return {
                loading: false,
                error: false,
                agents: [],
                message: '',
                requestType: ''
            }
        }
        default:
            return state
    }
}

export default membersReducer