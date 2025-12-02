package com.jewelora.marketplace.userservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AdminRegisterRequest {

    @NotBlank
    private String roleId;

    @NotBlank
    private String adminUsername;

    @NotBlank
    private String adminPassword;
}