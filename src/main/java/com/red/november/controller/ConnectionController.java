package com.red.november.controller;

import com.red.november.pojo.Game;
import com.red.november.pojo.JoinGameDto;
import com.red.november.pojo.Player;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;

/**
 * Created by Oleksandr on 11/20/2016.
 */
@Component
@Path("/")
public class ConnectionController {

	private Map<String, Game> games = new HashMap<>();

	@GET
	@Path("games")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Game> getGameList() {
		return games.values();
	}

	@POST
	@Path("newGame")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Game createGame(Game game) {
		game.setOwnerPlayerId(game.getPlayers().iterator().next().getId());
		games.put(game.getId(), game);
		return game;
	}

	@POST
	@Path("joinGame")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Game joinGame(JoinGameDto joinGameDto) {
		Game gameToJoin = games.get(joinGameDto.getGameId());
		Player player = new Player();
		player.setName(joinGameDto.getPlayerName());
		gameToJoin.getPlayers().add(player);
		return gameToJoin;
	}
}
