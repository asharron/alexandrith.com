export const ENTER_COMMAND = 'ENTER_COMMAND';
export const CURRENT_COMMAND = 'CURRENT_COMMAND';
export const SET_PROCESSING = 'SET_PROCESSING';
export const ADD_RESULT = 'ADD_RESULT';

export function enterCommand(text) {
    return { type: ENTER_COMMAND, text }
}

export function setCurrentCommand(text) {
    return { type: CURRENT_COMMAND, text}
}

export function setProcessing(isProcessing) {
    return { type: SET_PROCESSING, isProcessing }
}

export function addResult(value) {
    return { type: ADD_RESULT, value}
}