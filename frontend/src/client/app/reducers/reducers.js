var SockJS = require('sockjs-client');
import { combineReducers } from 'redux'
import {
    CREATE_GAME,
    LEFT_GAME
} from '../actions/actions.js'

function currentGame(state = {serverUrl: 'http://localhost:8080'} , action) {
    switch(action.type){
        case CREATE_GAME:
            let socket = new SockJS(state.serverUrl + '/actions');
            socket.onmessage = action.handler;
            return Object.assign({}, state, {
                game : action.game,
                currentPlayerId : action.currentPlayerId,
                connection : socket
            });
        case LEFT_GAME:
            state.connection.send(JSON.stringify(action));
            state.connection.close();
            return state;
        default :
            return state;
    }
}

const rootReducer = combineReducers({
    currentGame
})

export default rootReducer