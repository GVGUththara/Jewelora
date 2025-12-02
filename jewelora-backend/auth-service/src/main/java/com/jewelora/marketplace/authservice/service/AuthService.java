package com.jewelora.marketplace.authservice.service;

import com.jewelora.marketplace.authservice.client.UserClient;
import com.jewelora.marketplace.authservice.dto.LoginResponse;
import com.jewelora.marketplace.authservice.dto.UserDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final UserClient userClient;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthService(UserClient userClient,
                       PasswordEncoder passwordEncoder,
                       TokenService tokenService) {
        this.userClient = userClient;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    public LoginResponse loginAndCreateToken(String identifier, String rawPassword) throws Exception {
        UserDTO user = userClient.findByIdentifier(identifier);
        if (user == null || !user.getIsActive()) {
            throw new RuntimeException("Invalid credentials");
        }

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        List<String> roles = List.of(user.getRoleName());

        String subject = (user.getEmail() != null && !user.getEmail().isBlank())
                ? user.getEmail()
                : user.getUsername();

        String token = tokenService.createAccessToken(subject, user.getUserId(), roles);

        return new LoginResponse(
                token,
                "Bearer",
                tokenService.getExpirationMillis(),
                user.getRoleName(),
                user.getUserId()
        );
    }

    public long getExpirationMillis() {
        return tokenService.getExpirationMillis();
    }
}