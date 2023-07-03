package com.heap.backend.controller;

import com.heap.backend.data.request.CreateRecipeRequest;
import com.heap.backend.data.request.DeleteRecipeRequest;
import com.heap.backend.data.response.ErrorResponse;
import com.heap.backend.data.response.Response;
import com.heap.backend.service.auth.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    @PostMapping("/createRecipe")
    public ResponseEntity<Response> create (@RequestBody CreateRecipeRequest request) {

        //Current error faced is the token is being cut off in the RequestParam, need to fix
        Response response = recipeService.create(request);

        //If response is instance of Error Response, it means that duplicated username or Internal Server Error
        if (response instanceof ErrorResponse) {

            ErrorResponse errorResponse = (ErrorResponse) response;

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

    @PostMapping("/deleteRecipe")
    public ResponseEntity<Response> delete (@RequestBody DeleteRecipeRequest request) {
        Response response = recipeService.delete(request);

        if (response instanceof ErrorResponse) {

            ErrorResponse errorResponse = (ErrorResponse) response;

            if (errorResponse.getMessage().contains("Bad Request")) {

                return ResponseEntity.badRequest().body(errorResponse);

            } else {

                return ResponseEntity.internalServerError().body(errorResponse);
            }

        }

        return ResponseEntity.ok(response);
    }
}
