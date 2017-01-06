var SockJS = require('sockjs-client');
var Stomp = require('stompjs');

import { combineReducers } from 'redux'
import {
    CREATE_GAME,
    LEFT_GAME,
    JOIN_GAME,
    CREATE_GAME_RESPONSE,
    JOIN_GAME_RESPONSE
} from '../actions/actions.js'


var createGameStompClient = function(serverUrl, action){
    let createGameMessage = JSON.stringify({
        name : action.playerName,
        players : [{name: action.playerName }]
    });
    let socket = SockJS(serverUrl + '/actions');
    let stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/user/queue/newGame', action.gameCreatedHandler);
        stompClient.send('/app/newGame', {}, createGameMessage);
    });
    return stompClient;
}

var joinGameStompClient = function(serverUrl, action){
    let joinGameMessage = JSON.stringify({
        playerName : action.currentPlayerName,
        gameId : action.gameId
    });
    let socket = SockJS(serverUrl + '/actions');
    let stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/response/joinGame/' + action.gameId, action.joinedGameHandler);
        stompClient.subscribe('/response/message/' + action.gameId, action.serverMessageHandler);
        stompClient.send('/app/joinGame/' + action.gameId, {}, joinGameMessage);
    });
    return stompClient;
}

function currentGame(state = {serverUrl: 'http://localhost:8080'} , action) {
    let stompClient;
    switch(action.type){
        case CREATE_GAME:
            stompClient = createGameStompClient(state.serverUrl, action);
            return Object.assign({}, state, {
                connection : stompClient,
                gameCreatedHandler : action.gameCreatedHandler,
                joinedGameHandler : action.joinedGameHandler,
                serverMessageHandler : action.serverMessageHandler
            });
        case JOIN_GAME:
            stompClient = joinGameStompClient(state.serverUrl, action);
            return Object.assign({}, state, {
                connection : stompClient,
                gameCreatedHandler : action.gameCreatedHandler,
                joinedGameHandler : action.joinedGameHandler,
                serverMessageHandler : action.serverMessageHandler
            });
        case CREATE_GAME_RESPONSE:
            state.connection.subscribe('/response/joinGame/'+ action.game.id, state.joinedGameHandler);
            state.connection.subscribe('/response/message/'+ action.game.id, state.serverMessageHandler);
            return Object.assign({}, state, {
                   game : action.game,
                   currentPlayerId : action.game.ownerPlayerId,
            });
        case JOIN_GAME_RESPONSE:
            return Object.assign({}, state, {
                game : action.joinedGame.game,
                currentPlayerId : action.joinedGame.newPlayerId,
            });
        case LEFT_GAME:
            state.connection.send("/leftGame",JSON.stringify(action));
            state.connection.close();
            return Object.assign({}, state, {
                game : undefined,
                currentPlayerId : undefined,
                connection : undefined
            });
        default :
            return state;
    }
}

const rootReducer = combineReducers({
    currentGame
})

export default rootReducer