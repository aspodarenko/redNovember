package com.red.november.pojo;

import java.util.UUID;

/**
 * Created by Oleksandr on 11/20/2016.
 */
public class Player {

	private String name;

	private String id;

	public Player(){
		id = UUID.randomUUID().toString();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
