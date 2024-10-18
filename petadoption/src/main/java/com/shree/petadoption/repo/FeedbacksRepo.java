package com.shree.petadoption.repo;

import com.shree.petadoption.model.FeedbackData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface FeedbacksRepo extends JpaRepository<FeedbackData,String> {
    boolean existsByEmail(String email);
    FeedbackData findByEmail(String email);
}
