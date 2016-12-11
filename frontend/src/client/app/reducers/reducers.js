import { combineReducers } from 'redux'
import {
    CREATE_GAME,
    CREATE_CONNECTION
} from '../actions/actions.js'

function currentGame(state = {} , action) {
    switch(action.type){
        case CREATE_GAME:
            return Object.assign({}, state, {
                game : action.game,
                currentPlayerId : action.currentPlayerId
            });
        default :
            return state;
    }
}

function server(state = {serverUrl: 'http://localhost:8080'}, action ) {
    switch(action.type){
        case CREATE_CONNECTION:
            let connection = new WebSocket(state.serverUrl);
            this.connection.onmessage = action.handler;
            return Object.assign({}, state, {connection : connection});
        default :
            return state;
    }
}

const rootReducer = combineReducers({
    currentGame,
    server
})

export default rootReducer