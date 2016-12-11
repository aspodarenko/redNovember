import { combineReducers } from 'redux'
import {
    CREATE_GAME
} from '../actions/actions.js'

function currentGame(state = {} , action) {
    switch(action.type){
        case CREATE_GAME:
            return Object.assign({}, state, action.initialState);
        default :
            return state;
    }
}

const rootReducer = combineReducers({
    currentGame
})

export default rootReducer