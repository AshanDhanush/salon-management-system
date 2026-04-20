package com.saloon.back_end.service.Impl;

import com.saloon.back_end.model.dto.AuthResponse;
import com.saloon.back_end.model.dto.LoginRequest;
import com.saloon.back_end.model.dto.RegisterRequest;
import com.saloon.back_end.model.dto.UserDto;
import com.saloon.back_end.model.entity.User;
import com.saloon.back_end.repository.UserRepository;
import com.saloon.back_end.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.Map;
@Service
@RequiredArgsConstructor

public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtServiceImpl jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {
        var user = User.builder()
                .Name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .contactNo(request.getContactNo())
                .role(request.getRole())
                .build();

        User savedUser = userRepository.save(user);

        // FIX: Add role to claims so Gateway can read it
        Map<String, Object> extraClaims = new HashMap<>();
        if (savedUser.getRole() != null) {
            extraClaims.put("role", savedUser.getRole().name());
        }

        var jwtToken = jwtService.generateToken(extraClaims, user);

        var userDto = UserDto.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .contactNo(savedUser.getContactNo())
                .role(savedUser.getRole())
                .build();

        return AuthResponse.builder()
                .token(jwtToken)
                .user(userDto)
                .build();
    }


    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + request.getEmail()));

        // FIX: Add role to claims so Gateway can read it
        Map<String, Object> extraClaims = new HashMap<>();
        if (user.getRole() != null) {
            extraClaims.put("role", user.getRole().name());
        }

        var jwtToken = jwtService.generateToken(extraClaims, user);

        var userDto = UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .contactNo(user.getContactNo())
                .role(user.getRole())
                .build();

        System.out.println("Access the login");

        return AuthResponse.builder()
                .token(jwtToken)
                .user(userDto)
                .build();
    }
}

