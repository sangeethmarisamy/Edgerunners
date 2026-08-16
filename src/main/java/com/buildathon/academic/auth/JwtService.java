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

    public boolean isValid(String token) {

        try {
            String[] parts = token.split("\\.");

            if (parts.length != 3) {
                return false;
            }

            String data = parts[0] + "." + parts[1];

            String expectedSignature = hmacSha256(data);

            if (!expectedSignature.equals(parts[2])) {
                return false;
            }

            String payload = new String(
                    Base64.getUrlDecoder().decode(parts[1]),
                    StandardCharsets.UTF_8
            );

            long expiration = extractLong(payload, "exp");

            long currentTime = System.currentTimeMillis() / 1000;

            return currentTime < expiration;

        } catch (Exception e) {
            return false;
        }
    }

    public String getUsername(String token) {

        String[] parts = token.split("\\.");

        if (parts.length != 3) {
            throw new IllegalArgumentException("Invalid JWT");
        }

        String payload = new String(
                Base64.getUrlDecoder().decode(parts[1]),
                StandardCharsets.UTF_8
        );

        return extractString(payload, "sub");
    }

    public String getRole(String token) {

        String[] parts = token.split("\\.");

        if (parts.length != 3) {
            throw new IllegalArgumentException("Invalid JWT");
        }

        String payload = new String(
                Base64.getUrlDecoder().decode(parts[1]),
                StandardCharsets.UTF_8
        );

        return extractString(payload, "role");
    }

    private String extractString(String json, String key) {

        String search = "\"" + key + "\":\"";

        int start = json.indexOf(search);

        if (start == -1) {
            throw new IllegalArgumentException("Missing claim: " + key);
        }

        start += search.length();

        int end = json.indexOf("\"", start);

        if (end == -1) {
            throw new IllegalArgumentException("Invalid claim: " + key);
        }

        return json.substring(start, end);
    }

    private long extractLong(String json, String key) {

        String search = "\"" + key + "\":";

        int start = json.indexOf(search);

        if (start == -1) {
            throw new IllegalArgumentException("Missing claim: " + key);
        }

        start += search.length();

        int end = json.indexOf(",", start);

        if (end == -1) {
            end = json.indexOf("}", start);
        }

        return Long.parseLong(
                json.substring(start, end)
        );
    }

    private String base64UrlEncode(String value) {

        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(
                        value.getBytes(StandardCharsets.UTF_8)
                );
    }

    private String hmacSha256(String data) {

        try {

            Mac mac = Mac.getInstance("HmacSHA256");

            SecretKeySpec secretKeySpec =
                    new SecretKeySpec(
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

            throw new RuntimeException(
                    "Failed to generate JWT",
                    e
            );
        }
    }
}
