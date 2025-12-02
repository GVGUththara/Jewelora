package com.jewelora.marketplace.authservice.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String identifier; // email or username
    private String password;
}