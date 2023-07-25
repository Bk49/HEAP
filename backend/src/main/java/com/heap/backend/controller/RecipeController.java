package com.heap.backend.controller;

import com.heap.backend.data.request.recipe.CreateRecipeRequest;
import com.heap.backend.data.request.recipe.UpdateRecipeRequest;
import com.heap.backend.data.response.Response;
import com.heap.backend.service.CommonService;
import com.heap.backend.service.auth.JwtService;
import com.heap.backend.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class RecipeController {
    private final CommonService commonService;
    private final RecipeService recipeService;
    private final JwtService jwtService;

    @PostMapping("/createRecipe")
    public ResponseEntity<Response> create (@RequestBody CreateRecipeRequest request, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(recipeService.create(request, oldEmail));

    }

    @DeleteMapping("/deleteRecipe/{recipeId}")
    public ResponseEntity<Response> delete (@PathVariable String recipeId, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(recipeService.delete(recipeId, oldEmail));
    }

    @PutMapping("/updateRecipe/{recipeId}")
    public ResponseEntity<Response> update (@PathVariable String recipeId, @RequestBody UpdateRecipeRequest request, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(recipeService.update(recipeId, request, oldEmail));
    }

    @GetMapping ("/findRecipe/{recipeId}")
    public ResponseEntity<Response> findOne(@PathVariable String recipeId, @RequestHeader ("Authorization") String token) {
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(recipeService.findOne(recipeId, oldEmail));
    }

    @GetMapping("/findAllRecipe")
    public ResponseEntity<Response> findAll(@RequestHeader ("Authorization") String token) {
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(recipeService.findAll(oldEmail));
    }
}
