package com.jewelora.marketplace.productservice.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class ProductCategoryCreateRequest {
	@NotBlank
    private String categoryName;
}
