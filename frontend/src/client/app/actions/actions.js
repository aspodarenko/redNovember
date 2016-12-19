export const CREATE_GAME = 'CREATE_GAME'
export const CREATE_CONNECTION = 'CREATE_CONNECTION'
export const LEFT_GAME = 'LEFT_GAME'

export function newGame(game, playerId) {
    return {
        type : CREATE_GAME,
        game : game,
        currentPlayerId : playerId
    }
}

export function leftGame(gameId, playerId) {
    return {
        type : LEFT_GAME,
        playerId : playerId,
        gameId : gameId
    }
}

export function createConnection(messageHandler) {
    return {
        type : CREATE_CONNECTION,
        handler : messageHandler
    }
}
