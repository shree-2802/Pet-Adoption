package com.shree.petadoption.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="feedbacks")
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackData {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userid;
    private String email;
    private String feedback;
    private String type;
}
