package com.jewelora.marketplace.orderservice.dto;


import lombok.Data;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderCreateRequest {

    @NotBlank
    private String customerId;
    
    @NotBlank
    private String customerContact;

    @NotBlank
    private String streetNumber;

    @NotBlank
    private String streetName1;

    private String streetName2;

    @NotBlank
    private String city;

    @NotBlank
    private String postalCode;
    
    @NotEmpty(message = "Order must have at least one item")
    private List<OrderItemRequest> items;
}