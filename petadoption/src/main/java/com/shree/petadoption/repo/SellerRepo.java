package com.shree.petadoption.repo;

import com.shree.petadoption.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface SellerRepo extends JpaRepository<Seller,String> {
    boolean existsByEmail(String email);
}
