import { combineReducers } from 'redux'
import {
    CREATE_GAME,
    CREATE_CONNECTION,
    LEFT_GAME
} from '../actions/actions.js'

function currentGame(state = {} , action) {
    switch(action.type){
        case CREATE_GAME:
            return Object.assign({}, state, {
                game : action.game,
                currentPlayerId : action.currentPlayerId
            });
        case LEFT_GAME:
            state.connection.send(JSON.stringify(action));
            state.connection.close();
            return state;
        default :
            return state;
    }
}

function server(state = {serverUrl: 'http://localhost:8080'}, action ) {
    switch(action.type){
        case CREATE_CONNECTION:
            let host = state.serverUrl.substring(7, state.serverUrl.length);
            let connection = new WebSocket("ws://"+ host + '/actions');
            connection.onmessage = action.handler;
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