package com.heap.backend.controller;

import com.heap.backend.data.request.UpdateProfileRequest;
import com.heap.backend.data.response.Response;
import com.heap.backend.data.response.ErrorResponse;
import com.heap.backend.service.auth.JwtService;
import com.heap.backend.service.auth.UpdateProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UpdateProfileController {

    private final UpdateProfileService updateProfileService;
    private final JwtService jwtService;

    @PutMapping("/update")
    public ResponseEntity<Response> update (@RequestBody UpdateProfileRequest request, @RequestHeader ("Authorization") String token){

        //Obtaining jwt token and email from jwt token
        String jwt = token.substring(7);
        String oldEmail = jwtService.extractEmail(jwt);

        //Ontaining Response from UpdateProfileService
        Response response = updateProfileService.update(request, oldEmail);


        //If response is instance of Error Response, it means that duplicated username or Internal Server Error
        if (response instanceof ErrorResponse errorResponse) {

            //Add in variations of error if devised

            if (errorResponse.getMessage().contains("Bad Request")) {

                ResponseEntity.badRequest().body(errorResponse);

            } else {

                return ResponseEntity.internalServerError().body(errorResponse);

            }
        }

        //Else, return ok response
        return ResponseEntity.ok(response);
    }
}
