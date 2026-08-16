package com.buildathon.academic.auth;

public record JwtResponse(
        String token,
        String username,
        String role
) {
}

