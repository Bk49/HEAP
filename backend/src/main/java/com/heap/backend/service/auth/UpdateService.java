package com.heap.backend.service.auth;

import com.heap.backend.data.request.AuthenticationRequest;
import com.heap.backend.data.request.RegisterRequest;
import com.heap.backend.data.request.UpdateRequest;
import com.heap.backend.data.response.*;
import com.heap.backend.models.Business;
import com.heap.backend.models.User;
import com.heap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public Response update(UpdateRequest request) {

        //If request has no new email, update fields accordingly
        boolean changeEmail = request.getEmail() != null;

        //Obtains user/business from repository based on old Email
        User origUser = repository.findByEmail(request.getOldEmail())
                .orElseThrow();
        User user = origUser.duplicate();
        Business business = user.getBusiness();

        //Updates all fields accordingly based on UpdateRequest if the fields are not empty
        if (request.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getBusinessName() != null) {
            business.setBusinessName(request.getBusinessName());
        }
        if (request.getBusinessType() != null) {
            business.setBusinessType(request.getBusinessType());
        }
        if (request.getCuisineType() != null) {
            business.setCuisineType(request.getCuisineType());
        }
        if (request.isFusion() != business.isFusion()) {
            business.setFusion(request.isFusion());
        }
        if (request.getStoreAddress() != null) {
            business.setStoreAddress(request.getStoreAddress());
        }

        //Recreates User class using new business class
        user.setBusiness(business);


        try {

            //Deletes previous entity of user
            repository.delete(repository.findByEmail(request.getOldEmail()).orElseThrow());
            //Attempts to save new entity of user
            repository.save(user);

        } catch (IllegalArgumentException e) {

            //If unsuccessful to delete previous entity
            return UpdateErrorResponse.builder()
                    .error("Bad Request: No such user found")
                    .message("Please check your old Email")
                    .build();
        }  catch (DuplicateKeyException e) {

            //If unsuccessful to save new user due to duplicate email
            //Add in previous user to revert to original state
            repository.save(origUser);
            return UpdateErrorResponse.builder()
                    .error("Bad Request: Duplicated user email")
                    .message("Please provide another new user email")
                    .build();

        } catch (Exception e) {

            /*
             * Note to future developer:
             * This portion might cause issues as cause of error is unknown which may cause the user to be completely
             * deleted without being added back as a new account. Might require fixing in future
             */

            //Catches any other form of exception as unknown error
            return UpdateErrorResponse.builder()
                    .error("Unknown Error")
                    .message("An unknown error has occurred! Do try again!")
                    .build();
        }

        //If Everything goes smoothly, response will be created using UpdateResponse with token
        var jwtToken = jwtService.generateToken(user);
        return UpdateResponse.builder()
                .token(jwtToken)
                .build();
    }
}
