package com.shree.petadoption.repo;

import com.shree.petadoption.model.SendingMail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface SendingMailRepo extends JpaRepository<SendingMail,String> {
}
