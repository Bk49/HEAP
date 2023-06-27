package com.heap.backend.controller;

import com.heap.backend.data.request.AuthenticationRequest;
import com.heap.backend.data.response.AuthenticationErrorResponse;
import com.heap.backend.data.response.AuthenticationResponse;
import com.heap.backend.data.response.Response;
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
    public ResponseEntity<Response> register (
            @RequestBody RegisterRequest request
    ){

        Response response = service.register(request);

        //If response is instance of Error Response, it means that duplicated username or Internal Server Error
        if (response instanceof AuthenticationErrorResponse) {

            AuthenticationErrorResponse errorResponse = (AuthenticationErrorResponse)response;

            if ("Bad Request: Duplicated user email".equals(errorResponse.getError())) {

                return ResponseEntity.badRequest().body(errorResponse);

            } else {

                return ResponseEntity.internalServerError().body(errorResponse);

            }

        }

        //Else, return ok response
        return ResponseEntity.ok(response);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Response> authenticate (
            @RequestBody AuthenticationRequest request
    ){

        Response response = service.authenticate(request);

        //If AuthenticationErrorResponse found, handle as respective errors
        if (response instanceof AuthenticationErrorResponse) {
            AuthenticationErrorResponse authenticationErrorResponse = (AuthenticationErrorResponse) response;

            if ("Invalid Credentials".equals(authenticationErrorResponse.getError())) {
                return ResponseEntity.badRequest().body(authenticationErrorResponse);

            } else {

                return ResponseEntity.internalServerError().body(authenticationErrorResponse);
            }

        }

        //Else, return token to user
        return ResponseEntity.ok(response);
    }
}
