package com.jewelora.marketplace.notificationservice.dto;

import java.math.BigDecimal;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SmsRequest {

    @NotBlank
    private String phone;

    @NotBlank
    private String orderId;

    private BigDecimal totalAmount;
}
