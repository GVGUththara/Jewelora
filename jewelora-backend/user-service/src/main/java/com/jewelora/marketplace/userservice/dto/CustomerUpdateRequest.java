package com.jewelora.marketplace.userservice.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CustomerUpdateRequest {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    @Email
    private String email;

    private String streetNumber;
    private String streetName1;
    private String streetName2;
    private String city;
    private String postalCode;
    private String contactNumber;
}