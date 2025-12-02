package com.jewelora.marketplace.orderservice.dto;

import lombok.Data;

@Data
public class CustomerAddressUpdateRequest {
    private String streetNumber;
    private String streetName1;
    private String streetName2;
    private String city;
    private String postalCode;
    private String contactNumber;
}