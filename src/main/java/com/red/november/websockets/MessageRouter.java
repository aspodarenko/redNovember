package com.red.november.websockets;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

/**
 * Created by Oleksandr on 12/18/2016.
 */


public class MessageRouter implements WebSocketHandler{

	@Override
	public void afterConnectionEstablished(WebSocketSession session)
			throws Exception {

	}

	@Override
	public void handleMessage(WebSocketSession session,
			WebSocketMessage<?> message) throws Exception {

	}

	@Override
	public void handleTransportError(WebSocketSession session,
			Throwable exception) throws Exception {

	}

	@Override
	public void afterConnectionClosed(WebSocketSession session,
			CloseStatus closeStatus) throws Exception {

	}

	@Override
	public boolean supportsPartialMessages() {
		return false;
	}
}