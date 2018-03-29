import * as types from './types'

export function initChat(data) {
    return {
        type: types.INIT_CHAT,
        data: data
    }
}

export function addMessage(data) {
    return {
        type: types.ADD_MESSAGE,
        data: data
    }
}
export function clearChat(data) {
    return {
        type: types.CLEAR_CHAT,
        data: data
    }
}
