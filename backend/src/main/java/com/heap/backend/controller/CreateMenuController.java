package com.heap.backend.controller;

import com.heap.backend.data.request.CreateMenuRequest;
import com.heap.backend.data.response.Response;
import com.heap.backend.data.response.UpdateErrorResponse;
import com.heap.backend.service.auth.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class CreateMenuController {

    private final MenuService menuService;

    @PostMapping("/createMenu")
    public ResponseEntity<Response> create (@RequestBody CreateMenuRequest request) {

        //Current error faced is the token is being cut off in the RequestParam, need to fix
        Response response = menuService.create(request);

        //If response is instance of Error Response, it means that duplicated username or Internal Server Error
        if (response instanceof UpdateErrorResponse errorResponse) {

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
