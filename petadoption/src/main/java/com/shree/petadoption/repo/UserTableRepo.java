package com.shree.petadoption.repo;

import com.shree.petadoption.model.UserTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface UserTableRepo extends JpaRepository<UserTable,String> {

    boolean existsByEmail(String email);
}
