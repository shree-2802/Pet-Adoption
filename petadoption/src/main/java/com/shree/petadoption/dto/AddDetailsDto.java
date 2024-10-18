package com.shree.petadoption.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddDetailsDto {


    private String pet_name;

    private String breed_name;

    private int age;

    private float price;

    private String description;

    private String sellerId;

    private String userId;
}
