package com.jewelora.marketplace.userservice.controller;

import com.jewelora.marketplace.userservice.dto.UserDTO;
import com.jewelora.marketplace.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/internal/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/find")
    public ResponseEntity<UserDTO> findUser(@RequestParam("identifier") String identifier) {
        UserDTO user = userService.findUser(identifier);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }
}