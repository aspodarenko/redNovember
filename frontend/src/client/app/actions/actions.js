export const CREATE_GAME = 'CREATE_GAME'
export const LEFT_GAME = 'LEFT_GAME'
export const JOIN_GAME = 'JOIN_GAME'
export const CREATE_GAME_RESPONSE = 'CREATE_GAME_RESPONSE'
export const JOIN_GAME_RESPONSE = 'JOIN_GAME_RESPONSE'
export const LEFT_GAME_RESPONSE = 'LEFT_GAME_RESPONSE'
export const START_GAME = 'START_GAME'
export const START_GAME_RESPONSE = 'START_GAME_RESPONSE'

export function newGame(gameOwnerName, gameCreatedHandler, joinedGameHandler, serverMessageHandler) {
    return {
        type : CREATE_GAME,
        playerName : gameOwnerName,
        gameCreatedHandler : gameCreatedHandler,
        joinedGameHandler : joinedGameHandler,
        serverMessageHandler : serverMessageHandler
    }
}

export function joinGame(gameId, playerName, gameCreatedHandler, joinedGameHandler, serverMessageHandler) {
    return {
        type : JOIN_GAME,
        gameId : gameId,
        currentPlayerName : playerName,
        gameCreatedHandler : gameCreatedHandler,
        joinedGameHandler : joinedGameHandler,
        serverMessageHandler : serverMessageHandler
    }
}

export function gameCreatedResponse(game) {
    return {
        type : CREATE_GAME_RESPONSE,
        game : game
    }
}

export function joinGameResponse(joinedGame) {
    return {
        type : JOIN_GAME_RESPONSE,
        joinedGame : joinedGame
    }
}

export function leftGame(gameId, playerId) {
    return {
        type : LEFT_GAME,
        playerId : playerId,
        gameId : gameId
    }
}


export function startGame(gameId, playerId) {
    return {
        type : START_GAME,
        playerId : playerId,
        gameId : gameId
    }
}

