import { combineReducers } from 'redux';
import { ENTER_COMMAND, CURRENT_COMMAND, SET_PROCESSING,
    ADD_RESULT } from '../actions/actions';

function commands(state=[], action) {
    switch(action.type) {
        case(ENTER_COMMAND):
            return [...state, action.text]
        default:
            return state
    }
}

function results(state=[], action) {
    switch(action.type) {
        case(ADD_RESULT):
            return [...state, action.value];
        default:
            return state;
    }
}

function currentCommand(state="", action) {
    switch(action.type) {
        case(CURRENT_COMMAND):
            return action.text;
        default:
            return state;
    }
}

function isProcessing(state=false, action) {
    switch(action.type) {
        case(SET_PROCESSING):
            return action.isProcessing;
        default:
            return state;
    }
}

const terminalApp = combineReducers({
    commands,
    results,
    currentCommand,
    isProcessing
});

export default terminalApp;
