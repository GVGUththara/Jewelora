package com.jewelora.marketplace.authservice.controller;

import com.jewelora.marketplace.authservice.dto.LoginRequest;
import com.jewelora.marketplace.authservice.dto.LoginResponse;
import com.jewelora.marketplace.authservice.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/jewelora/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse resp = authService.loginAndCreateToken(
                    request.getIdentifier(),
                    request.getPassword()
            );

            return ResponseEntity.ok(resp);

        } catch (RuntimeException ex) {
            return ResponseEntity.status(401).body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(Map.of("error", "internal error"));
        }
    }

}