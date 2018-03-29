import * as types from '../actions/types'

export default function(state = {}, action = {}) {
    switch (action.type) {
        case types.INIT_QUESTIONS:{
            return action.data
        }
        case types.ADD_QUESTION:{
            var question = action.data;
            return {...state, question }
        }
        case types.DELETE_QUESTION:{
            var newState = {...state};
            delete newState[action.data];
            return newState
        }
        default:
            return state;
    }
}
