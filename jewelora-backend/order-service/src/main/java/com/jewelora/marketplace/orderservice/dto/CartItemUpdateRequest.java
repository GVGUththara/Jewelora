package com.jewelora.marketplace.orderservice.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class CartItemUpdateRequest {

    @NotNull
    private Integer quantity;
}
