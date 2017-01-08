package com.red.november.pojo;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Created by Oleksandr on 11/20/2016.
 */
public class Game implements Serializable {

	private String id;

	private String name;

	private String ownerPlayerId;

	private Boolean started;

	private Set<Player> players = new HashSet<>();

	public Game(){
		started = false;
		id = UUID.randomUUID().toString();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Set<Player> getPlayers() {
		return players;
	}

	public void setPlayers(Set<Player> players) {
		this.players = players;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOwnerPlayerId() {
		return ownerPlayerId;
	}

	public void setOwnerPlayerId(String ownerPlayerId) {
		this.ownerPlayerId = ownerPlayerId;
	}

	public Boolean getStarted() {
		return started;
	}

	public void setStarted(Boolean started) {
		this.started = started;
	}
}
