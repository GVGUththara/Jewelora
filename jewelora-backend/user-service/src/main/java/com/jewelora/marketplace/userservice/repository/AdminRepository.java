package com.jewelora.marketplace.userservice.repository;

import com.jewelora.marketplace.userservice.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
    
    Optional<Admin> findByAdminUsername(String username);

    boolean existsByAdminUsername(String username);
}