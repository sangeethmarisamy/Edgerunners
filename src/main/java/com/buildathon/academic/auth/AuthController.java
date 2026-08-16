package com.buildathon.academic.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        if (userRepository.existsByUsername(request.username())) {
            return ResponseEntity.badRequest()
                    .body("Username already exists");
        }

        if (userRepository.existsByEmail(request.email())) {
            return ResponseEntity.badRequest()
                    .body("Email already exists");
        }

        User user = new User(
                request.username(),
                request.email(),
                passwordEncoder.encode(request.password()),
                request.role()
        );

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = userRepository
                .findByUsername(request.username())
                .orElse(null);

        if (user == null) {
            return ResponseEntity.status(401)
                    .body("Invalid username or password");
        }

        if (!passwordEncoder.matches(
                request.password(),
                user.getPassword())) {

            return ResponseEntity.status(401)
                    .body("Invalid username or password");
        }

        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(
                new JwtResponse(
                        token,
                        user.getUsername(),
                        user.getRole()
                )
        );
    }

    public record RegisterRequest(
            String username,
            String email,
            String password,
            String role
    ) {
    }
}
