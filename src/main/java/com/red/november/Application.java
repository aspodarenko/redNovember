package com.red.november;

import com.red.november.pojo.Game;
import com.red.november.websockets.MessageRouter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@EnableWebSocket
public class Application extends SpringBootServletInitializer implements
		WebSocketConfigurer {

	public static Map<String, Game> games = new HashMap<>();

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);

	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(new MessageRouter(), "/actions").withSockJS();
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(Application.class);
	}
}
