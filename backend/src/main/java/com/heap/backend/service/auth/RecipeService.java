package com.heap.backend.service.auth;

import com.heap.backend.data.request.CreateRecipeRequest;
import com.heap.backend.data.request.DeleteRecipeRequest;
import com.heap.backend.data.request.UpdateRecipeRequest;
import com.heap.backend.data.response.*;
import com.heap.backend.models.Recipe;
import com.heap.backend.models.User;
import com.heap.backend.repository.RecipeRepository;
import com.heap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecipeService {
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    public Response create(CreateRecipeRequest request) {

        String oldEmail = "John2@gmail.com";    //Debugging line! Hardcode
        User origUser = userRepository.findByEmail(oldEmail).orElseThrow();
        String id = origUser.getId();

        Recipe recipe = Recipe.builder()
                .userId(id)
                .name(request.getName())
                .category(request.getCategory())
                .cost(request.getCost())
                .description(request.getDescription())
//                .image(request.getImage())                //To be fixed when everything has been settled
                .ingredients(request.getIngredients())
                .steps(request.getSteps())
                .build();

        //To work on additional logic in accessing known errors
        try {
            recipeRepository.save(recipe);

        } catch (Exception e) {
            return ErrorResponse.builder()
                    .error("Internal Server Error")
                    .message("Unknown Error")
                    .build();
        }

        return SuccessResponse.builder()
                .response("Recipe updated successfully")
                .build();


    }

    public Response delete(DeleteRecipeRequest request) {

        String oldEmail = "John2@gmail.com";    //Debugging line! Hardcode
        User origUser = userRepository.findByEmail(oldEmail).orElseThrow();
        String id = origUser.getId();

        if (id == null) {

            return ErrorResponse.builder()
                    .error("Bad Request: User has no recipe")
                    .message("Please try again when user has recipe")
                    .build();

        } else if (recipeRepository.findByUserIdAndName(id, request.getName()).isEmpty()) {

            return ErrorResponse.builder()
                    .error("Bad Request: User has no such recipe")
                    .message("Please check the spelling of the recipe name")
                    .build();
        }

        try {
            recipeRepository.deleteByUserIdAndName(id, request.getName());
        } catch (Exception e) {
            return ErrorResponse.builder()
                    .error("Bad Request: Recipe not found")
                    .message(e.getClass().getName())
                    //.message("Please ensure that the recipe name has been spelt correctly")
                    .build();
        }

        return SuccessResponse.builder()
                .response("Recipe has been deleted successfully")
                .build();
    }

    public Response update(String recipeName, UpdateRecipeRequest request) {

        String oldEmail = "John2@gmail.com";    //Debugging line! Hardcode
        User origUser = userRepository.findByEmail(oldEmail).orElseThrow();
        String userId = origUser.getId();

        //Assuming all are filled
        Recipe recipe = recipeRepository.findByUserIdAndName(userId, recipeName).orElseThrow();
        recipe.setUserId(userId);
        recipe.setName(request.getName());
        recipe.setCategory(request.getCategory());
        recipe.setCost(request.getCost());
        //recipe.setImage(request.setImage());
        recipe.setDescription(request.getDescription());
        recipe.setIngredients(request.getIngredients());
        recipe.setSteps(request.getSteps());

        try {
            recipeRepository.save(recipe);
        } catch (Exception e) {
            return ErrorResponse.builder()
                    .error("Internal Server Error")
                    .message("Unknown Error")
                    .build();
        }

        return SuccessResponse.builder()
                .response("Recipe has been updated successfully")
                .build();
    }
}
