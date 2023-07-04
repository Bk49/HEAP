package com.heap.backend.controller;

import com.heap.backend.data.request.CreateRecipeRequest;
import com.heap.backend.data.request.DeleteRecipeRequest;
import com.heap.backend.data.request.UpdateRecipeRequest;
import com.heap.backend.data.response.ErrorResponse;
import com.heap.backend.data.response.Response;
import com.heap.backend.service.auth.JwtService;
import com.heap.backend.service.auth.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;
    private final JwtService jwtService;

    @PostMapping("/createRecipe")
    public ResponseEntity<Response> create (@RequestBody CreateRecipeRequest request, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String jwt = token.substring(7);
        String oldEmail = jwtService.extractEmail(jwt);

        //Current error faced is the token is being cut off in the RequestParam, need to fix
        Response response = recipeService.create(request, oldEmail);

        //If response is instance of Error Response, it means that duplicated username or Internal Server Error
        return checkResponse(response);
    }

    @PostMapping("/deleteRecipe")
    public ResponseEntity<Response> delete (@RequestBody DeleteRecipeRequest request, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String jwt = token.substring(7);
        String oldEmail = jwtService.extractEmail(jwt);

        Response response = recipeService.delete(request, oldEmail);

        return checkResponse(response);
    }

    @PutMapping("/updateRecipe/{recipeId}")
    public ResponseEntity<Response> update (@PathVariable String recipeId, @RequestBody UpdateRecipeRequest request, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String jwt = token.substring(7);
        String oldEmail = jwtService.extractEmail(jwt);

        Response response = recipeService.update(recipeId, request, oldEmail);

        return checkResponse(response);
    }

    public ResponseEntity<Response> checkResponse(Response response) {

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
