package com.buildathon.academic.auth;

public record LoginRequest(
        String username,
        String password
) {
}
