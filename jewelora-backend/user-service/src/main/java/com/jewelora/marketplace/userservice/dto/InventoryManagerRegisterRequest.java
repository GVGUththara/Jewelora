package com.jewelora.marketplace.userservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class InventoryManagerRegisterRequest {

    @NotBlank
    private String roleId;

    @NotBlank
    private String inventoryManagerUsername;

    @NotBlank
    private String inventoryManagerPassword;
}
