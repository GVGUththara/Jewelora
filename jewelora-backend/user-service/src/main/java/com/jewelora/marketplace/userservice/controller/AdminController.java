package com.jewelora.marketplace.userservice.controller;

import com.jewelora.marketplace.userservice.dto.AdminRegisterRequest;
import com.jewelora.marketplace.userservice.entity.Admin;
import com.jewelora.marketplace.userservice.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/jewelora/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/register-admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody AdminRegisterRequest request) {
        Admin admin = adminService.registerAdmin(request);
        return ResponseEntity.status(201).body(admin);
    }
}