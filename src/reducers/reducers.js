import { combineReducers } from 'redux'
import { PULL_POSTS } from '../actions/actions';


function posts(state=[], action){
    switch(action.type) {
        case PULL_POSTS:
            return [...state, ...action.posts]
        default:
            return state
    }
}


export default combineReducers({
    posts
});