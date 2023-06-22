package com.heap.backend.service.auth;

import com.heap.backend.data.request.AuthenticationRequest;
import com.heap.backend.data.response.AuthenticationResponse;
import com.heap.backend.data.request.RegisterRequest;
import com.heap.backend.models.Business;
import com.heap.backend.models.User;
import com.heap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        Business business = null;

        try {
            business = Business.builder().businessName(request.getBusinessName())
                    .businessType(request.getBusinessType())
                    .cuisineType(request.getCuisineType())
                    .isFusion(request.isFusion())
                    .storeAddress(request.getStoreAddress())
                    .build();

        } catch (Exception e) {

            //Take away once debugging is over
            System.out.println("One/All Business Fields are Empty");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .business(business)
                .build();

        //Error handling is user fail to be saved to repository
        var jwtToken = jwtService.generateToken(user);

        //If Business is null, throw Internal Server Error in controller
        if (business == null) {
            jwtToken = null;
            return AuthenticationResponse.builder()
                    .build();
        }

        //If repository does not find a user of the same email in the repository, handle as usual
        try {

            //If user cannot be found in the repository, save user
            repository.save(user);

        } catch (Exception e) {

            //Else, change the token to null which is to be handled by controller
            jwtToken = null;
        }

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
