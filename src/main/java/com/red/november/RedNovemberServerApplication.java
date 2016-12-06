package com.red.november;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class RedNovemberServerApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(RedNovemberServerApplication.class, args);

	}
}
