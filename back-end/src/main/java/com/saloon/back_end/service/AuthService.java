package com.saloon.back_end.service;

import com.saloon.back_end.model.dto.AuthResponse;
import com.saloon.back_end.model.dto.LoginRequest;
import com.saloon.back_end.model.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
