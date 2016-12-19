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
                game : action.gameId,
                currentPlayerId : action.currentPlayerId
            });
        case LEFT_GAME:
            this.connection.send(JSON.stringify(action));
            return state;
        default :
            return state;
    }
}

function server(state = {serverUrl: 'http://localhost:8080'}, action ) {
    switch(action.type){
        case CREATE_CONNECTION:
            let connection = new WebSocket(state.serverUrl + '/actions');
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