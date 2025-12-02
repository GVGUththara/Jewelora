package com.jewelora.marketplace.authservice.client;

import com.jewelora.marketplace.authservice.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "user-service")
public interface UserClient {

    @GetMapping("/internal/users/find")
    UserDTO findByIdentifier(@RequestParam("identifier") String identifier);
}