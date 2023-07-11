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
        String oldEmail = returnOldEmail(token);
        return checkResponse(recipeService.create(request, oldEmail));

    }

    @PostMapping("/deleteRecipe")
    public ResponseEntity<Response> delete (@RequestBody DeleteRecipeRequest request, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = returnOldEmail(token);
        return checkResponse(recipeService.delete(request, oldEmail));
    }

    @PutMapping("/updateRecipe/{recipeId}")
    public ResponseEntity<Response> update (@PathVariable String recipeId, @RequestBody UpdateRecipeRequest request, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = returnOldEmail(token);
        return checkResponse(recipeService.update(recipeId, request, oldEmail));
    }

    @GetMapping ("/findRecipe/{recipeId}")
    public ResponseEntity<Response> findOne(@PathVariable String recipeId, @RequestHeader ("Authorization") String token) {
        String oldEmail = returnOldEmail(token);
        return checkResponse(recipeService.findOne(recipeId, oldEmail));
    }

    @GetMapping("/findAllRecipe")
    public ResponseEntity<Response> findAll(@RequestHeader ("Authorization") String token) {
        String oldEmail = returnOldEmail(token);
        return checkResponse(recipeService.findAll(oldEmail));
    }


    public String returnOldEmail(String token) {

        String jwt = token.substring(7);
        return jwtService.extractEmail(jwt);

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
