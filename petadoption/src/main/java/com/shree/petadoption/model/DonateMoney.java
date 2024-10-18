package com.shree.petadoption.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="donation")
public class DonateMoney {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String donar_id;
    @ManyToOne
    @JoinColumn(name="userid")
    private UserTable User;
    private String email_id;
    private int amount;
}
