package com.red.november.pojo;

import java.util.Collection;

/**
 * Created by Oleksandr on 1/7/2017.
 */
public class LeftGameResponse extends GenericAction {

	public LeftGameResponse(){
		this.type = "LEFT_GAME_RESPONSE";
	}

	private Collection<Game> games;

	public Collection<Game> getGames() {
		return games;
	}

	public void setGames(Collection<Game> games) {
		this.games = games;
	}
}
