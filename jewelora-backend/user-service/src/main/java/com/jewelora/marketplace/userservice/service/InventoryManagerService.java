package com.jewelora.marketplace.userservice.service;

import com.jewelora.marketplace.userservice.dto.InventoryManagerRegisterRequest;
import com.jewelora.marketplace.userservice.entity.InventoryManager;
import com.jewelora.marketplace.userservice.repository.InventoryManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InventoryManagerService {

    private final InventoryManagerRepository inventoryManagerRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public InventoryManager registerInventoryManager(InventoryManagerRegisterRequest request) {

        if (inventoryManagerRepository.existsByInventoryManagerUsername(request.getInventoryManagerUsername())) {
            throw new RuntimeException("Inventory Manager username already exists");
        }

        InventoryManager manager = InventoryManager.builder()
                .roleId(request.getRoleId())
                .inventoryManagerUsername(request.getInventoryManagerUsername())
                .inventoryManagerPassword(passwordEncoder.encode(request.getInventoryManagerPassword()))
                .isActive(true)
                .build();

        return inventoryManagerRepository.save(manager);
    }
}