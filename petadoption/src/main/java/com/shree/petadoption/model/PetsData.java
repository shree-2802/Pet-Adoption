package com.shree.petadoption.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="pets_data")
@NoArgsConstructor
@AllArgsConstructor
public class PetsData {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String petid;
    private String pet_name;
    private String breed_name;
    private int age;
//    @OneToOne(targetEntity = PetImage.class)
//    @JoinColumn(name = "PetImage")
    private String profile_image;
    private float price;
    private String description;

    @ManyToOne
    @JoinColumn(name="seller_id")
    private Seller Seller;

    @ManyToOne
    @JoinColumn(name="customer_id")
    private UserTable User;
}
