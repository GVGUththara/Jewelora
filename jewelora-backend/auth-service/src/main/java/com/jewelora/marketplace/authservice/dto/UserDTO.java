package com.jewelora.marketplace.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private String userId;
    private String username;   
    private String email;      
    private String password; 
    private String roleName;   
    private Boolean isActive;
}