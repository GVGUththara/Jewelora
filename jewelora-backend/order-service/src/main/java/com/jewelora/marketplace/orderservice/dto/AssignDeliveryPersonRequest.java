package com.jewelora.marketplace.orderservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AssignDeliveryPersonRequest {

    @NotBlank(message = "Delivery person ID is required")
    private String deliveryPersonId;
}