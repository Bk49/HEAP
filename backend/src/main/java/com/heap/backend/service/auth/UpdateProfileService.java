package com.heap.backend.service.auth;

import com.heap.backend.data.request.UpdateProfileRequest;
import com.heap.backend.data.response.*;
import com.heap.backend.models.Business;
import com.heap.backend.models.Recipe;
import com.heap.backend.models.User;
import com.heap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateProfileService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Response update(UpdateProfileRequest request, String oldEmail) {

        //Check if Password and ConfirmPassword are the same
        //If not the same, return UpdateErrorResponse based on bad request
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return ErrorResponse.builder()
                    .error("Bad Request: Password is not the same as Confirm Password")
                    .message("Please check your Password Fields")
                    .build();
        }

        //Obtain old email to be used to access old user details
        User origUser = null;
        try {

            origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("No such user found"));
            String id = origUser.getId();

            //Changes business class based on updateRequest
            Business business = origUser.getBusiness();
            business.setBusinessName(request.getBusinessName());
            business.setBusinessType(request.getBusinessType());
            business.setCuisineType(request.getCuisineType());
            business.setFusion(request.isFusion());
            business.setStoreAddress(request.getStoreAddress());
            business.setPostalCode(request.getPostalCode());
            origUser.setBusiness(business);

            //Changes user based on updateRequest
            origUser.setEmail(request.getEmail());

            //In the case that user wants to change password
            if (request.getPassword() != null) {

                origUser.setPassword(passwordEncoder.encode(request.getPassword()));

            }

            //Attempts to save new entity of user using register
            userRepository.save(origUser);

        } catch (IllegalArgumentException e) {

            //If user cannot be found in the repository based on token obtained info, return ErrorResponse
            return ErrorResponse.builder()
                    .error("Bad Request: Invalid Token")
                    .message("User not found")
                    .build();

        } catch (DuplicateKeyException e) {

            //If new email has already been found, save old user and return ErrorResponse
            userRepository.save(origUser);
            return ErrorResponse.builder()
                    .error("Bad Request: Duplicated user email")
                    .message("Please choose an email that has not been used")
                    .build();

        } catch (Exception e) {

            //For any other forms of error, return as unknown error

            /*
             * Note to future developer:
             * This portion might cause issues as cause of error is unknown which may cause the user to be completely
             * deleted without being added back as a new account. Might require fixing in future
             */

            //Catches any other form of exception as unknown error
            return ErrorResponse.builder()
                    .error("Internal Server Error: Unknown Error")
                    .message("An unknown error has occurred! Do try again!")
                    .build();

        }

        //If Everything goes smoothly, response will be created using UpdateResponse with message
        return SuccessResponse.builder()
                .response("Profile updated successfully")
                .build();
    }

    public Response findOne(String oldEmail) {

        User user = null;

        try {

            user = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));

        } catch (IllegalArgumentException e) {

            //If user cannot be found in the repository based on token obtained info, return ErrorResponse
            return ErrorResponse.builder()
                    .error("Bad Request: Invalid Token")
                    .message("User not found")
                    .build();


        } catch (Exception e) {

            //Catches any other form of exception as unknown error
            return ErrorResponse.builder()
                    .error("Internal Server Error: Unknown Error")
                    .message("An unknown error has occurred! Do try again!")
                    .build();

        }

        return SingleUserResponse.builder()
                .user(user)
                .build();

    }
}
