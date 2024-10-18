package com.shree.petadoption.repo;

import com.shree.petadoption.model.PetsData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PetsDataRepo extends JpaRepository<PetsData,String> {
}
