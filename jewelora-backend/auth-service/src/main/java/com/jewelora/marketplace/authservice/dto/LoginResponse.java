package com.jewelora.marketplace.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private long expiresIn; // milliseconds
    private String role;
    private String userId;
}