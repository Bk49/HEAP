package com.heap.backend.service.auth;

import com.heap.backend.data.request.RegisterRequest;
import com.heap.backend.data.request.UpdateRequest;
import com.heap.backend.data.response.*;
import com.heap.backend.models.Business;
import com.heap.backend.models.Menu;
import com.heap.backend.models.User;
import com.heap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateService {
    private final UserRepository repository;
    private final AuthenticationService authenticationService;
    private final PasswordEncoder passwordEncoder;

    public Response update(UpdateRequest request, String token) {

        //Check if Password and ConfirmPassword are the same
        //If not the same, return UpdateErrorResponse based on bad request
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return UpdateErrorResponse.builder()
                    .error("Bad Request: Password is not the same as Confirm Password")
                    .message("Please check your Password Fields")
                    .build();
        }

        //Obtain old email to be used to access old user details
        String oldEmail = "John3@gmail.com";    //Debugging line! Hardcode
//        String oldEmail = jwtService.extractEmail(token);
        User origUser = repository.findByEmail(oldEmail).orElseThrow();

        String id = origUser.getId();

        //Creates new business class based on updateRequest
        Business business = Business.builder().businessName(request.getBusinessName())
                .businessType(request.getBusinessType())
                .cuisineType(request.getCuisineType())
                .isFusion(request.isFusion())
                .storeAddress(request.getStoreAddress())
                .postalCode(request.getPostalCode())
                //Need to figure out how to copy menu over
                .menu(new Menu[10])
                .menuItems(0)
                .build();

        //Creates new user based on updateRequest

        User user = User.builder()
                .id(id)
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .business(business)
                .build();

        //Tries to delete old details of user and create new entry
        try {

            //Deletes previous entity of user
            repository.delete(origUser);
            //Attempts to save new entity of user using register
            repository.save(user);

        } catch (IllegalArgumentException e) {

            //If unsuccessful to delete previous entity
            return UpdateErrorResponse.builder()
                    .error("Bad Request: No such user found")
                    .message("Please check your old Email")
                    .build();

        } catch (DuplicateKeyException e) {

            //If email has already been found, return error
            repository.save(origUser);
            return UpdateErrorResponse.builder()
                    .error("Bad Request: Duplicated user email")
                    .message("Please choose an email that has not been used")
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

        //If Everything goes smoothly, response will be created using UpdateResponse with message
        return UpdateResponse.builder()
                .response("Item updated successfully")
                .build();
    }
}
