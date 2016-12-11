export const CREATE_GAME = 'CREATE_GAME'

export function newGame(game) {
    return {
        type : CREATE_GAME,
        initialState : game
    }
}
