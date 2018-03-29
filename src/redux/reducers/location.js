import * as types from '../actions/types'

export default function(state = {}, action = {}) {
    switch (action.type) {
        case types.CHANGE_LOCATION:{
            return action.data
        }
        default:
            return state;
    }
}
