import * as types from '../actions/types'

export default function(state = {}, action = {}) {
    switch (action.type) {
        case types.INIT_CHAT:{
            var chat = {};
            chat[action.data.cardKey] = action.data.messages;
            return {...state, chat};
        }
        case types.CLEAR_CHAT:{
            var newState = {...state};
            delete newState[action.data];
            return newState;
        }
        case types.ADD_MESSAGE:{
            var message = action.data.message;
            var cardKey = action.data.cardKey;
            newState = {...state };
            if(newState[cardKey]){
                newState[cardKey].messages.push(message)
            } else {
                newState[cardKey] = {};
                newState[cardKey].messages = [message];
            }
            newState[cardKey].initialized = true;
            newState[cardKey].messages.sort((a, b) => {
                if (a.sentAt > b.sentAt) {
                    return -1;
                }
                if (a.sentAt < b.sentAt) {
                    return 1;
                }
                return 0;
            });
            return newState;
        }
        default:
            return state;
    }
}
