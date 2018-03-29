import * as types from './types'

export function initQuestions(data) {
    return {
        type: types.INIT_QUESTIONS,
        data: data
    }
}

export function addQuestion(data) {

    return {
        type: types.ADD_QUESTION,
        data: data
    }
}

export function deleteQuestion(data) {
    return {
        type: types.DELETE_QUESTION,
        data: data
    }
}


export function updateQuestion(data) {

    return {
        type: types.UPDATE_QUESTION,
        data: data
    }
}
