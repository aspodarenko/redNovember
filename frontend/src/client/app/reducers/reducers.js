var SockJS = require('sockjs-client');
var Stomp = require('stompjs');

import { combineReducers } from 'redux'
import {
    CREATE_GAME,
    LEFT_GAME,
    JOIN_GAME,
    CREATE_GAME_RESPONSE,
    JOIN_GAME_RESPONSE,
    LEFT_GAME_RESPONSE,
    START_GAME,
    START_GAME_RESPONSE
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

let removePlayer = function (state, playerIdToRemove) {
    let newGameState = Object.assign({}, state.game);
    let playerIndex = -1;
    newGameState.players.forEach((player, index) => {
        if (player.id == playerIdToRemove) {
            playerIndex = index;
        }
    });
    if (playerIndex > -1) {
        newGameState.players.splice(playerIndex, 1);
    }
    return newGameState
};

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
            let playerId;
            if(state.currentPlayerId == undefined){
                playerId = action.joinedGame.newPlayerId;
            } else {
                playerId = state.currentPlayerId;
            }
            return Object.assign({}, state, {
                game : action.joinedGame.game,
                currentPlayerId : playerId,
            });
        case LEFT_GAME:
                state.connection.send("/app/leftGame/" + state.game.id, {}, JSON.stringify(action));
                return Object.assign({}, state, {
                    game: undefined,
                    currentPlayerId: undefined
                });
        case LEFT_GAME_RESPONSE:
            if(state.game == undefined || action.playerId == state.game.ownerPlayerId) {
                state.connection.disconnect();
                return Object.assign({}, state, {
                    game: undefined,
                    availableGames: action.games,
                    connection: undefined
                });
            } else {
                let newGameState = removePlayer(state, action.playerId);
                return Object.assign({}, state, {
                    game: newGameState
                });
            }
        case START_GAME:
            state.connection.send("/app/startGame/" + state.game.id, {}, JSON.stringify(action));
            return state;
        case START_GAME_RESPONSE:
            let newGameState = Object.assign({}, state.game, {
                started : true
            });
            return Object.assign({}, state, {
                game: newGameState
            });
        default :
            return state;
    }
}

const rootReducer = combineReducers({
    currentGame
})

export default rootReducer