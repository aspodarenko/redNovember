package com.red.november;

import com.red.november.controller.ConnectionController;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
public class JerseyConfig extends ResourceConfig {

	public JerseyConfig() {
		property(ServletProperties.FILTER_STATIC_CONTENT_REGEX, "/*");
		property(ServletProperties.FILTER_FORWARD_ON_404, true);
		register(ConnectionController.class);
	}

}