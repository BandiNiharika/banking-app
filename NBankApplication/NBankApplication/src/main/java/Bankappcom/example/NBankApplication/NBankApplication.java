package Bankappcom.example.NBankApplication;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication

@EntityScan(basePackages = "Bankappcom.example.NBankApplication")
@EnableJpaRepositories(basePackages = "Bankappcom.example.NBankApplication")
@ComponentScan(basePackages = "Bankappcom.example.NBankApplication")
public class NBankApplication {

	public static void main(String[] args) {
		SpringApplication.run(NBankApplication.class, args);
	} 
	

   
}
