package com.shree.petadoption.service;


import com.shree.petadoption.dto.AddDetailsDto;
import com.shree.petadoption.dto.DonateMoneyDto;
import com.shree.petadoption.dto.ResponseDto;
import com.shree.petadoption.model.*;
import com.shree.petadoption.repo.*;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
//Spring boot service component is defined as a class file that includes the @Service annotation and allows developers to add business functionalities.
public class UserServices {
    @Autowired
    private UserTableRepo userTableRepo;
    @Autowired
    private SellerRepo sellerRepo;
    @Autowired
    private PetsDataRepo petsDataRepo;
    @Autowired
    private FeedbacksRepo feedbacksRepo;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private DonateMoneyRepo donateMoneyRepo;
    public List<UserTable> getAllUser(){
        return userTableRepo.findAll();
    }

    public List<Seller> getAllSeller(){
        return sellerRepo.findAll();
    }

    public List<PetsData> getAllPets(){
        return petsDataRepo.findAll();
    }

//    public void addPet(MultipartFile file, AddDetailsDto addDetailsDto) throws IOException {
//        PetsData petsData=new PetsData();
//        PetImage petImage=new PetImage();
//        petImage.setName(file.getName());
//        petImage.setType(file.getContentType());
//        petImage.setProfileImage(file.getBytes());
//        petsData.setPet_name(addDetailsDto.getPet_name());
//        petsData.setBreed_name(addDetailsDto.getBreed_name());
//        petsData.setAge(addDetailsDto.getAge());
//        petsData.setPrice(addDetailsDto.getPrice());
//        petsData.setDescription(addDetailsDto.getDescription());
//
////        Seller seller=userTableRepo.findById(addDetailsDto.getSellerId()).get();
////        petsData.setSeller(seller);
//        petsData.setImageId(petImage);
//        petsImageRepo.save(petImage);
//
//        petsDataRepo.save(petsData);
//    }
    public List<FeedbackData> getallfeedbacks(){
        return feedbacksRepo.findAll();
    }

    public ResponseEntity<ResponseDto> addUser(UserTable user) {

        if (userTableRepo.existsByEmail(user.email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ResponseDto("User with the email " + user.email + " already exist", null));
        }

        UserTable savedUser = userTableRepo.save(user);
        return ResponseEntity.ok(new ResponseDto("user saved successfully", savedUser));

    }

    public ResponseEntity<ResponseDto> addPets(PetsData petsData){
        petsDataRepo.save(petsData);
        return ResponseEntity.ok(new ResponseDto("set",petsData));
    }
    public ResponseEntity<ResponseDto> addSeller(Seller seller) {

        if(sellerRepo.existsByEmail(seller.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ResponseDto("User with the email " + seller.getEmail() + " already exist", null));
        }

        Seller savedSeller = sellerRepo.save(seller);
        return ResponseEntity.ok(new ResponseDto("Seller added successfully", savedSeller));
    }
    public ResponseEntity<ResponseDto> addFeedback(FeedbackData feedbackData){
        if(feedbacksRepo.existsByEmail(feedbackData.getEmail())){
            FeedbackData existingFeedback=feedbacksRepo.findByEmail(feedbackData.getEmail());
            existingFeedback.setFeedback(feedbackData.getFeedback());
            FeedbackData updated=feedbacksRepo.save(existingFeedback);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("Feedback updated",updated));
        }
        FeedbackData savedFeedback=feedbacksRepo.save(feedbackData);
        return ResponseEntity.ok(new ResponseDto("Feedback saved",savedFeedback));
    }

    public void sendingemailhere(SendingMail sendingMail){
        emailSenderService.sendEmail(sendingMail);
    }

    public ResponseEntity<ResponseDto> getSinglePet(String id) {
       Optional<PetsData> petsData=petsDataRepo.findById(id);

       if(petsData.isPresent())
        return ResponseEntity.ok().body(new ResponseDto("data retrieved",petsData.get()));

       return ResponseEntity.badRequest().body(new ResponseDto("data retreival failed",""));
    }

    public ResponseEntity<ResponseDto> getDonationData(){
        List<DonateMoney> donation=donateMoneyRepo.findAll();
        return ResponseEntity.ok().body(new ResponseDto("Data fetched",donation));
    }

    public ResponseEntity<ResponseDto> postDonationData(DonateMoneyDto donateMoneyDto){
        Optional<UserTable> user = userTableRepo.findById(donateMoneyDto.getUser_id());


                DonateMoney donateMoney =new DonateMoney();

                donateMoney.setUser(user.get());
                donateMoney.setAmount(donateMoneyDto.getAmount());
                donateMoney.setEmail_id(donateMoneyDto.getEmail());
        donateMoneyRepo.save(donateMoney);
        return ResponseEntity.ok().body(new ResponseDto("Pushed",""));
    }
}
