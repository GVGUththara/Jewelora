package com.jewelora.marketplace.productservice.dto;

import lombok.Data;

import java.math.BigDecimal;

import jakarta.validation.constraints.*;

@Data
public class ProductCreateRequest {

    @NotBlank
    private String productName;

    @NotBlank
    private String productCategory;

    @NotNull
    private BigDecimal unitPrice;

    @NotNull
    private BigDecimal productDiscount = BigDecimal.ZERO;

    @NotNull
    private Integer stockQuantity;

    @NotBlank
    private String material;

    private String color;

    private String imageUrl;
}