package com.heap.backend.controller;

import com.heap.backend.data.request.user.AuthenticationRequest;
import com.heap.backend.data.response.common.ErrorResponse;
import com.heap.backend.data.response.Response;
import com.heap.backend.service.auth.AuthenticationService;
import com.heap.backend.data.request.user.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody RegisterRequest request) {
        Response response = authenticationService.register(request);

        //If response is instance of Error Response, it means that duplicated username or Internal Server Error
        if (response instanceof ErrorResponse errorResponse) {
            return "Bad Request: Duplicated user email".equals(errorResponse.getError())
                    ? ResponseEntity.badRequest().body(errorResponse)
                    : ResponseEntity.internalServerError().body(errorResponse);
        }

        //Else, return ok response
        return ResponseEntity.ok(response);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Response> authenticate(@RequestBody AuthenticationRequest request) {
        Response response = authenticationService.authenticate(request);

        //If AuthenticationErrorResponse found, handle as respective errors
        if (response instanceof ErrorResponse errorResponse) {
            return "Invalid Credentials".equals(errorResponse.getError())
                    ? ResponseEntity.badRequest().body(errorResponse)
                    : ResponseEntity.internalServerError().body(errorResponse);
        }

        //Else, return token to user
        return ResponseEntity.ok(response);
    }
}
