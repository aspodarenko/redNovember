export const CREATE_GAME = 'CREATE_GAME'
export const LEFT_GAME = 'LEFT_GAME'

export function newGame(game, playerId, messageHandler) {
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

