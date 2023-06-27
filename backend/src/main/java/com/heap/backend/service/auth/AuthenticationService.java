package com.heap.backend.service.auth;

import com.heap.backend.data.request.AuthenticationRequest;
import com.heap.backend.data.response.AuthenticationErrorResponse;
import com.heap.backend.data.response.AuthenticationResponse;
import com.heap.backend.data.request.RegisterRequest;
import com.heap.backend.data.response.Response;
import com.heap.backend.models.Business;
import com.heap.backend.models.User;
import com.heap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public Response register(RegisterRequest request) {

        //If parts of the request is empty/not filled, return AuthenticationErrorResponse for Internal Server Error
        if (request.getEmail() == null || request.getPassword() == null) {
            return AuthenticationErrorResponse.builder()
                    .error("Internal Server Error")
                    .message("One or more User fields are empty")
                    .build();
        } else if (request.getBusinessType() == null || request.getCuisineType() == null || request.getStoreAddress() == null) {
            return AuthenticationErrorResponse.builder()
                    .error("Internal Server Error")
                    .message("One or more Business fields are empty")
                    .build();
        }

        //If all fields have been filled, create the business class and user classes using builder() and build()
        Business business = Business.builder().businessName(request.getBusinessName())
                    .businessType(request.getBusinessType())
                    .cuisineType(request.getCuisineType())
                    .isFusion(request.isFusion())
                    .storeAddress(request.getStoreAddress())
                    .build();

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .business(business)
                .build();

        //If repository does not find a user of the same email in the repository, handle as usual
        try {

            //If user cannot be found in the repository, save user
            repository.save(user);

        } catch (Exception e) {

            //Else, return a AuthenticationErrorResponse for Bad Request
            return AuthenticationErrorResponse.builder()
                    .error("Bad Request")
                    .message("Duplicated user email")
                    .build();
        }

        //If Everything goes smoothly, response will be created using AuthenticationResponse with token
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public Response authenticate(AuthenticationRequest request) {

        if (request.getEmail() == null || request.getPassword() == null) {
            return AuthenticationErrorResponse.builder()
                    .error("Internal Server Error")
                    .message("One or more User fields are empty")
                    .build();
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {

            //Handles Exception if username/Password is incorrect, returns an AuthenticationErrorResponse
            return AuthenticationErrorResponse.builder()
                    .error("Invalid Credentials")
                    .message("Email/Password is incorrect")
                    .build();
        }

        //If authenticated, create jwt token and return an AuthenticationResponse
        User user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
