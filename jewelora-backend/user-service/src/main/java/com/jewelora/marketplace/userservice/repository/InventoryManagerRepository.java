package com.jewelora.marketplace.userservice.repository;

import com.jewelora.marketplace.userservice.entity.InventoryManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface InventoryManagerRepository extends JpaRepository<InventoryManager, String> {
    
    Optional<InventoryManager> findByInventoryManagerUsername(String username);

    boolean existsByInventoryManagerUsername(String username);
}
