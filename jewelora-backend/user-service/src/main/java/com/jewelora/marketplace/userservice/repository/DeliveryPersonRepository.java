package com.jewelora.marketplace.userservice.repository;

import com.jewelora.marketplace.userservice.entity.DeliveryPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DeliveryPersonRepository extends JpaRepository<DeliveryPerson, String> {
    Optional<DeliveryPerson> findByEmail(String email);
    boolean existsByEmail(String email);
}