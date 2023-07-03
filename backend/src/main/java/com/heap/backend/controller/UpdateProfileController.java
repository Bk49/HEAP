package com.heap.backend.controller;

import com.heap.backend.data.request.UpdateProfileRequest;
import com.heap.backend.data.response.Response;
import com.heap.backend.data.response.ErrorResponse;
import com.heap.backend.service.auth.UpdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UpdateProfileController {

    private final UpdateService updateService;

    @PutMapping("/update")
    public ResponseEntity<Response> update (@RequestBody UpdateProfileRequest request, @RequestParam String token){

        //Current error faced is the token is being cut off in the RequestParam, need to fix
        Response response = updateService.update(request, token);

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
