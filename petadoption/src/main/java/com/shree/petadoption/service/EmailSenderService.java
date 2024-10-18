package com.shree.petadoption.service;

import com.shree.petadoption.model.SendingMail;
import com.shree.petadoption.repo.SendingMailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private SendingMailRepo sendingMailRepo;
    public void sendEmail(SendingMail sendingMail){
        SimpleMailMessage message=new SimpleMailMessage();
        message.setFrom("pattupadmashree@gmail.com");
        message.setTo(sendingMail.getEmail());
        if(sendingMail.getStatus().equals("loggedin")) {
            message.setSubject("Logged in");
            message.setText("Welcome back! Happy to see you!");
        }
        else if(sendingMail.getStatus().equals("loggedout")){
            message.setSubject("Logged out");
            message.setText("We miss you! Hope to see you soon");
        }
        else if(sendingMail.getStatus().equals("reply")){
            message.setSubject("Response from admin");
            message.setText(sendingMail.getReply());
        }
        else {
            message.setSubject("Welcome to our community");
            message.setText("Pet adoption website cordially welcome you!");
        }
        mailSender.send(message);
        System.out.println("Mail sent");
    }

}
