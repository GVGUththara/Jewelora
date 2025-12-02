package com.jewelora.marketplace.orderservice.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class CartItemAddRequest {

    @NotBlank
    private String cartId;

    @NotBlank
    private String productId;

    @NotBlank
    private String productName;
    
    private String productImage; 

    @NotNull
    private Integer quantity;

    @NotNull
    private Double unitPrice;

    private Double productDiscount = 0.0;

}
