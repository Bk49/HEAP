package com.heap.backend.controller;

import com.heap.backend.data.request.CreateMenuRequest;
import com.heap.backend.data.request.CreateRecipeRequest;
import com.heap.backend.data.response.CreateRecipeErrorResponse;
import com.heap.backend.data.response.CreateRecipeResponse;
import com.heap.backend.data.response.Response;
import com.heap.backend.data.response.UpdateErrorResponse;
import com.heap.backend.models.Recipe;
import com.heap.backend.service.auth.MenuService;
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
public class CreateRecipeController {

    private final RecipeService recipeService;

    @PostMapping("/createRecipe")
    public ResponseEntity<Response> create (@RequestBody CreateRecipeRequest request) {

        //Current error faced is the token is being cut off in the RequestParam, need to fix
        Response response = recipeService.create(request);

        //If response is instance of Error Response, it means that duplicated username or Internal Server Error
        if (response instanceof CreateRecipeErrorResponse) {

            CreateRecipeErrorResponse errorResponse = (CreateRecipeErrorResponse) response;

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
