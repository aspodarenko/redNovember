package com.red.november.controller;

import com.red.november.Application;
import com.red.november.pojo.*;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Oleksandr on 11/20/2016.
 */
@Component
@Controller
public class ConnectionController {

	@RequestMapping(value = "/games", produces = "application/json")
	@ResponseBody
	public Collection<Game> getGameList() {
		return getNotStartedGames();
	}

	private List<Game> getNotStartedGames() {
		return Application.games.values().stream().filter(game -> game.getStarted() == false).collect(
				Collectors.toList());
	}

	@MessageMapping("/newGame")
	@SendToUser(destinations = "/queue/newGame", broadcast=false)
	public Game createGame(@Payload Game game) {
		game.setOwnerPlayerId(game.getPlayers().iterator().next().getId());
		Application.games.put(game.getId(), game);
		return game;
	}

	@MessageMapping("/joinGame/{gameId}")
	@SendTo("/response/joinGame/{gameId}")
	public JoinGameResponseDto joinGame(@Payload JoinGameRequestDto joinGameRequestDto,
			@DestinationVariable String gameId) {
		Game gameToJoin = Application.games.get(gameId);
		Player player = new Player();
		player.setName(joinGameRequestDto.getPlayerName());
		gameToJoin.getPlayers().add(player);
		JoinGameResponseDto joinGameResponseDto = new JoinGameResponseDto(gameToJoin);
		joinGameResponseDto.setNewPlayerId(player.getId());
		return joinGameResponseDto;
	}

	@MessageMapping("/leftGame/{gameId}")
	@SendTo("/response/message/{gameId}")
	public GenericAction leftGame(@Payload GenericAction leftGameRequest, @DestinationVariable String gameId){
		if(Application.games.get(gameId).getOwnerPlayerId().equals(leftGameRequest.getPlayerId())) {
			Application.games.remove(gameId);
		} else {

			Application.games.get(gameId).getPlayers().removeIf(player -> player.getId().equals(leftGameRequest.getPlayerId()));
		}
		LeftGameResponse leftGameResponse = new LeftGameResponse();
		leftGameResponse.setGameId(leftGameRequest.getGameId());
		leftGameResponse.setPlayerId(leftGameRequest.getPlayerId());
		leftGameResponse.setGames(Application.games.values());
		return leftGameResponse;
	}

	@MessageMapping("/startGame/{gameId}")
	@SendTo("/response/message/{gameId}")
	public GenericAction startGame(@Payload GenericAction startGameRequest, @DestinationVariable String gameId){
		if(Application.games.get(gameId).getOwnerPlayerId().equals(startGameRequest.getPlayerId())) {
			Application.games.get(gameId).setStarted(true);
		}
		StartGameResponseDto startGameResponseDto = new StartGameResponseDto();
		startGameResponseDto.setGameId(gameId);
		startGameResponseDto.setPlayerId(startGameRequest.getPlayerId());
		return startGameResponseDto;
	}

	@MessageMapping("/message/{gameId}")
	@SendTo("/response/message/{gameId}")
	public GenericAction throwMessageToOtherPlayers(@Payload GenericAction genericAction, @DestinationVariable String gameId){
		return genericAction;
	}
}
