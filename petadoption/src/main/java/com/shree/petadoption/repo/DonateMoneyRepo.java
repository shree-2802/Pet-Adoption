package com.shree.petadoption.repo;

import com.shree.petadoption.model.DonateMoney;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface DonateMoneyRepo extends JpaRepository<DonateMoney,String> {
}
