package com.soutLink;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableTransactionManagement
@SpringBootApplication
@EnableAsync
public class SoutLinkApplication {

	public static void main(String[] args) {
		SpringApplication.run(SoutLinkApplication.class, args);
	}

}
