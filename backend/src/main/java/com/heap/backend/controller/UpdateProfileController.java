package com.heap.backend.controller;

import com.heap.backend.data.request.AuthenticationRequest;
import com.heap.backend.data.request.RegisterRequest;
import com.heap.backend.data.request.UpdateRequest;
import com.heap.backend.data.response.AuthenticationErrorResponse;
import com.heap.backend.data.response.Response;
import com.heap.backend.data.response.UpdateErrorResponse;
import com.heap.backend.service.auth.AuthenticationService;
import com.heap.backend.service.auth.UpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/updateProfile")
@RequiredArgsConstructor
public class UpdateProfileController {
    private final UpdateService service;

    @PostMapping("/update")
    public ResponseEntity<Response> update (@RequestBody UpdateRequest request){

        Response response = service.update(request);

        //If response is instance of Error Response, it means that duplicated username or Internal Server Error
        if (response instanceof UpdateErrorResponse) {

            //Add in variations of error if devised
            UpdateErrorResponse errorResponse = (UpdateErrorResponse)response;

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
