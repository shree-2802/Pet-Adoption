package com.shree.petadoption.controller;

import com.shree.petadoption.dto.AddDetailsDto;
import com.shree.petadoption.dto.DonateMoneyDto;
import com.shree.petadoption.dto.ResponseDto;
import com.shree.petadoption.model.*;
import com.shree.petadoption.service.EmailSenderService;
import com.shree.petadoption.service.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
//Controllers serve as the entry point for requests to your application.
public class UserController {
    @Autowired
    private UserServices userServices;

    @GetMapping("/user")
    public ResponseEntity<List<UserTable>> getAllUser() {
        List<UserTable> users = userServices.getAllUser();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/singlePet/{id}")
    public ResponseEntity<ResponseDto> getSinglePet(@PathVariable String id) {
        return userServices.getSinglePet(id);
    }


    @GetMapping("/seller")
    public ResponseEntity<List<Seller>> getAllSeller() {
        List<Seller> s = userServices.getAllSeller();
        return ResponseEntity.ok(s);
    }

    @GetMapping("/petsdata")
    public ResponseEntity<List<PetsData>> getAllPetsData() {
        List<PetsData> pets = userServices.getAllPets();
        return ResponseEntity.ok(pets);
    }

    @GetMapping("/feedbacks")
    public ResponseEntity<List<FeedbackData>> getFeedbacks() {
        List<FeedbackData> feedbacks = userServices.getallfeedbacks();
        return ResponseEntity.ok(feedbacks);
    }

    @PostMapping("/petsdata")
    public HttpStatus addPet(@RequestBody PetsData petsData){
        userServices.addPets(petsData);
        return HttpStatus.OK;
    }

    @PostMapping("/user")
    public ResponseEntity<ResponseDto> addUser(@RequestBody UserTable user) {
        return userServices.addUser(user);
    }

    @PostMapping("/seller")
    public ResponseEntity<ResponseDto> addSeller(@RequestBody Seller seller) {
        return userServices.addSeller(seller);
    }

    @PostMapping("/addfeedback")
    public ResponseEntity<ResponseDto> addFeedback(@RequestBody FeedbackData feedbackData) {
        return userServices.addFeedback(feedbackData);
    }

    @GetMapping("/donationdata")
    public ResponseEntity<ResponseDto> getDonationDetail(){
       return userServices.getDonationData();
    }

    @PostMapping("/donationdata")
    public ResponseEntity<ResponseDto> postDonationData(@RequestBody DonateMoneyDto donateMoney){
        return userServices.postDonationData(donateMoney);
    }
    @PostMapping("/sendmail")
    public void sendmail(@RequestBody SendingMail sendingMail) {
        userServices.sendingemailhere(sendingMail);
    }
}