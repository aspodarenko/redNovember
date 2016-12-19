package com.red.november.websockets;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

/**
 * Created by Oleksandr on 12/18/2016.
 */

@ServerEndpoint("/actions")
public class MessageRouter {

	@OnOpen
	public void onOpen(Session session)  {

	}

	@OnMessage
	public String handleAction(String message) {
		return message + " (from your server)";
	}

	@OnError
	public void onError(Throwable t) {
	}

	@OnClose
	public void onClose(Session session) {

	}
}