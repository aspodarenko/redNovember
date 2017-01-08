package com.red.november.pojo;

/**
 * Created by Oleksandr on 1/3/2017.
 */
public class GenericAction {

	protected String type;

	private String playerId;

	private String gameId;

	public String getPlayerId() {
		return playerId;
	}

	public String getType() {
		return type;
	}

	public void setPlayerId(String playerId) {
		this.playerId = playerId;
	}

	public String getGameId() {
		return gameId;
	}

	public void setGameId(String gameId) {
		this.gameId = gameId;
	}
}
