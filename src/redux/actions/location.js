import * as types from './types'

export function changeLocation(data) {
    return {
        type: types.CHANGE_LOCATION,
        data: data
    }
}
