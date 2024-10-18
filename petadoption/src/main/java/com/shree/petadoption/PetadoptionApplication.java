package com.shree.petadoption;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import com.shree.petadoption.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class PetadoptionApplication {
	@Autowired
	private EmailSenderService emailSenderService;
	public static void main(String[] args) {
		SpringApplication.run(PetadoptionApplication.class, args);
	}
//	@EventListener(ApplicationReadyEvent.class)
//	public void sendEmail(){
//		emailSenderService.sendEmail("pattupadmashree@gmail.com","Have a beautiful day","I sent this mail to you");
//	}
}

