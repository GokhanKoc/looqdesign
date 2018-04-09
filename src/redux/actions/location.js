import * as types from './types'

export function changeLocation(data) {
    console.log("CHANGE LOCATION");
    console.log("Constructor...."+data);

    return {
        type: types.CHANGE_LOCATION,
        data: data
    }
}
