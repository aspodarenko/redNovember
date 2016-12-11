package com.red.november.pojo;

import java.util.UUID;

/**
 * Created by Oleksandr on 12/12/2016.
 */
public class JoinGameResponseDto {
	private Game game;

	private String newPlayerId;

	public JoinGameResponseDto(Game game){
		this.game = game;
		newPlayerId = UUID.randomUUID().toString();
	}

	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
	}

	public String getNewPlayerId() {
		return newPlayerId;
	}

	public void setNewPlayerId(String newPlayerId) {
		this.newPlayerId = newPlayerId;
	}
}
