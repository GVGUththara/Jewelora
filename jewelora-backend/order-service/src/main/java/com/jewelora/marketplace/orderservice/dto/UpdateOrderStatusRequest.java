package com.jewelora.marketplace.orderservice.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class UpdateOrderStatusRequest {

    @NotNull
    private String newStatus;  

}