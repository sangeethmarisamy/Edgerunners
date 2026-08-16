package com.buildathon.academic.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class JwtService {

    private final String secretKey;
    private final long expirationMs = 24 * 60 * 60 * 1000;

    public JwtService(
            @Value("${jwt.secret:academic-intelligence-secret-key-2026}") String secretKey) {
        this.secretKey = secretKey;
    }

    public String generateToken(User user) {

        long issuedAt = System.currentTimeMillis();
        long expiration = issuedAt + expirationMs;

        String header = "{\"alg\":\"HS256\",\"typ\":\"JWT\"}";

        String payload = String.format(
                "{\"sub\":\"%s\",\"role\":\"%s\",\"iat\":%d,\"exp\":%d}",
                user.getUsername(),
                user.getRole(),
                issuedAt / 1000,
                expiration / 1000
        );

        String encodedHeader = base64UrlEncode(header);
        String encodedPayload = base64UrlEncode(payload);

        String data = encodedHeader + "." + encodedPayload;

        String signature = hmacSha256(data);

        return data + "." + signature;
    }

    private String base64UrlEncode(String value) {
        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(value.getBytes(StandardCharsets.UTF_8));
    }

    private String hmacSha256(String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");

            SecretKeySpec secretKeySpec = new SecretKeySpec(
                    secretKey.getBytes(StandardCharsets.UTF_8),
                    "HmacSHA256"
            );

            mac.init(secretKeySpec);

            byte[] hash = mac.doFinal(
                    data.getBytes(StandardCharsets.UTF_8)
            );

            return Base64.getUrlEncoder()
                    .withoutPadding()
                    .encodeToString(hash);

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate JWT", e);
        }
    }
}

