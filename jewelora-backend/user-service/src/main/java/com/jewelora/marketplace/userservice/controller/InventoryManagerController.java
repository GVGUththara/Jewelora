package com.jewelora.marketplace.userservice.controller;

import com.jewelora.marketplace.userservice.dto.InventoryManagerRegisterRequest;
import com.jewelora.marketplace.userservice.entity.InventoryManager;
import com.jewelora.marketplace.userservice.service.InventoryManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/jewelora/inventory-manager")
@RequiredArgsConstructor
public class InventoryManagerController {

    private final InventoryManagerService inventoryManagerService;

    @PostMapping("/register-inventory-manager")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerInventoryManager(@Valid @RequestBody InventoryManagerRegisterRequest request) {
        InventoryManager manager = inventoryManagerService.registerInventoryManager(request);
        return ResponseEntity.status(201).body(manager);
    }
    
    // Example ping endpoint
//    @GetMapping("/ping")
//    @PreAuthorize("hasRole('INVENTORY_MANAGER') or hasRole('ADMIN')")
//    public String inventoryPing() {
//        return "pong from inventory";
//    }
}