package com.red.november.controller;

import com.red.november.Application;
import com.red.november.pojo.Game;
import com.red.november.pojo.JoinGameRequestDto;
import com.red.november.pojo.JoinGameResponseDto;
import com.red.november.pojo.Player;
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

/**
 * Created by Oleksandr on 11/20/2016.
 */
@Component
@Controller
public class ConnectionController {

	@RequestMapping(value = "/games", produces = "application/json")
	@ResponseBody
	public Collection<Game> getGameList() {
		return Application.games.values();
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
		return new JoinGameResponseDto(gameToJoin);
	}

	@MessageMapping("/response/leftGame")
	public void leftGame(){

	}
}
