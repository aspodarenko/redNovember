package com.red.november.pojo;

import java.util.UUID;

/**
 * Created by Oleksandr on 12/3/2016.
 */
public class JoinGameDto {

	private String playerName;

	private String gameId;

	public String getPlayerName() {
		return playerName;
	}

	public void setPlayerName(String playerName) {
		this.playerName = playerName;
	}

	public String getGameId() {
		return gameId;
	}

	public void setGameId(String gameId) {
		this.gameId = gameId;
	}
}
