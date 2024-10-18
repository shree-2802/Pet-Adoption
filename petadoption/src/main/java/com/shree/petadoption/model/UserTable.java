package com.shree.petadoption.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "user_table")
@NoArgsConstructor
@AllArgsConstructor
public class UserTable {
    //---->Primary key
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String userid;
    public String email;
    public String password;
    private String name;
    private Long phone;
    private String role;
}
