package com.heap.backend.controller;

import com.heap.backend.data.request.AuthenticationRequest;
import com.heap.backend.data.response.AuthenticationResponse;
import com.heap.backend.data.response.CustomErrorResponse;
import com.heap.backend.service.auth.AuthenticationService;
import com.heap.backend.data.request.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (
            @RequestBody RegisterRequest request
    ){
        AuthenticationResponse response = service.register(request);

        //If token is null, it means that duplicate username so return internal server error instead of ok
        if (response.getToken() == null) {
            return ResponseEntity.badRequest().body(new CustomErrorResponse("Bad Request", "Duplicated user email"));
        }

        //Else, return ok response
        return ResponseEntity.ok(response);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody AuthenticationRequest request
    ){

        return ResponseEntity.ok(service.authenticate(request));
    }
}
