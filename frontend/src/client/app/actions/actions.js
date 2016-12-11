export const CREATE_GAME = 'CREATE_GAME'
export const CREATE_CONNECTION = 'CREATE_CONNECTION'

export function newGame(game, playerId) {
    return {
        type : CREATE_GAME,
        game : game,
        currentPlayerId : playerId
    }
}

export function createConnection(messageHandler) {
    return {
        type : CREATE_CONNECTION,
        handler : messageHandler
    }
}

export function leftGame() {
    return {
        type : CREATE_CONNECTION,
        handler : messageHandler
    }
}
