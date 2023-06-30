package com.heap.backend.service.auth;

import com.heap.backend.data.request.CreateMenuRequest;
import com.heap.backend.data.response.*;
import com.heap.backend.models.Menu;
import com.heap.backend.models.User;
import com.heap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MenuService {
    private final UserRepository repository;

    public Response create(CreateMenuRequest request) {

        String oldEmail = "John2@gmail.com";    //Debugging line! Hardcode

        Menu menu = Menu.builder()
                .name(request.getName())
                .type(request.getType())
                .sections(request.getSections())
                .build();

        User origUser = repository.findByEmail(oldEmail).orElseThrow();
        User user = origUser.duplicate();           //Need fine tune the duplicate class

        //Update new Menu into business fields
        //Consider try catching ArrayOutOfBoundException
        user.getBusiness().getMenu()[origUser.getBusiness().getMenuItems()] = menu;
        user.getBusiness().setMenuItems(origUser.getBusiness().getMenuItems() + 1);

        try {
            repository.delete(origUser);
            repository.save(user);

        } catch (Exception e) {

            return CreateMenuErrorResponse.builder()
                    .error("Internal Server Error")
                    .message("Unknown Error")
                    .build();
        }

        return CreateMenuResponse.builder()
                .response("Menu updated successfully")
                .build();

//        //Check if Password and ConfirmPassword are the same
//        //If not the same, return UpdateErrorResponse based on bad request
//        if (!request.getPassword().equals(request.getConfirmPassword())) {
//            return UpdateErrorResponse.builder()
//                    .error("Bad Request: Password is not the same as Confirm Password")
//                    .message("Please check your Password Fields")
//                    .build();
//        }
//
//        //Obtain old email to be used to access old user details
//        String oldEmail = "John3@gmail.com";    //Debugging line! Hardcode
////        String oldEmail = jwtService.extractEmail(token);
//        User origUser = repository.findByEmail(oldEmail).orElseThrow();
//
//        //Creates new registerRequest based on updateRequest
//        RegisterRequest registerRequest = RegisterRequest.builder()
//                .email(request.getEmail())
//                .password(request.getPassword())
//                .businessName(request.getBusinessName())
//                .businessType(request.getBusinessType())
//                .cuisineType(request.getCuisineType())
//                .isFusion(request.isFusion())
//                .storeAddress(request.getStoreAddress())
//                .build();
//
//
//        //Tries to delete old details of user and create new entry
//        Response response;
//        try {
//
//            //Deletes previous entity of user
//            repository.delete(repository.findByEmail(oldEmail).orElseThrow());
//            //Attempts to save new entity of user using register
//            response = authenticationService.register(registerRequest);
//
//
//        } catch (IllegalArgumentException e) {
//
//            //If unsuccessful to delete previous entity
//            return UpdateErrorResponse.builder()
//                    .error("Bad Request: No such user found")
//                    .message("Please check your old Email")
//                    .build();
//
//        } catch (Exception e) {
//
//            /*
//             * Note to future developer:
//             * This portion might cause issues as cause of error is unknown which may cause the user to be completely
//             * deleted without being added back as a new account. Might require fixing in future
//             */
//
//            //Catches any other form of exception as unknown error
//            return UpdateErrorResponse.builder()
//                    .error("Unknown Error")
//                    .message("An unknown error has occurred! Do try again!")
//                    .build();
//        }
//
//        //Checks if the response from register is an Error
//        if (response instanceof AuthenticationErrorResponse){
//
//            //If unsuccessful to save new user due to duplicate email
//            //Add in previous user to revert to original state
//            repository.save(origUser);
//            return UpdateErrorResponse.builder()
//                    .error("Bad Request: Duplicated user email")
//                    .message("Please provide another new user email")
//                    .build();
//
//        }
//
//        //If Everything goes smoothly, response will be created using UpdateResponse with message
//        return UpdateResponse.builder()
//                .response("Item updated successfully")
//                .build();
    }
}
