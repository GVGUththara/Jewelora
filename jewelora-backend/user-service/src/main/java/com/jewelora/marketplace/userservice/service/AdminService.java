package com.jewelora.marketplace.userservice.service;

import com.jewelora.marketplace.userservice.dto.AdminRegisterRequest;
import com.jewelora.marketplace.userservice.entity.Admin;
import com.jewelora.marketplace.userservice.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Admin registerAdmin(AdminRegisterRequest request) {

        if (adminRepository.existsByAdminUsername(request.getAdminUsername())) {
            throw new RuntimeException("Admin username already exists");
        }

        Admin admin = Admin.builder()
                .roleId(request.getRoleId())
                .adminUsername(request.getAdminUsername())
                .adminPassword(passwordEncoder.encode(request.getAdminPassword()))
                .isActive(true)
                .build();

        return adminRepository.save(admin);
    }
}