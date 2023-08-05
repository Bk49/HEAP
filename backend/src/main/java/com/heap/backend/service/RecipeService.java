package com.heap.backend.service;

import com.heap.backend.data.request.recipe.CreateRecipeRequest;
import com.heap.backend.data.request.recipe.UpdateRecipeRequest;
import com.heap.backend.data.response.*;
import com.heap.backend.data.response.common.ErrorResponse;
import com.heap.backend.data.response.common.SuccessResponse;
import com.heap.backend.data.response.recipe.MultipleRecipeResponse;
import com.heap.backend.data.response.recipe.SingleRecipeResponse;
import com.heap.backend.models.HEAPDate;
import com.heap.backend.models.recipe.Recipe;
import com.heap.backend.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final CommonService commonService;

    public Response create(CreateRecipeRequest request, String oldEmail) {

        try {
            String id = commonService.getIdByEmail(oldEmail);

            //Generate current DateTime String
            String currentDateTimeStr = new HEAPDate().toString();

            //Creating Recipe
            Recipe recipe = Recipe.builder()
                    .userId(id)
                    .name(request.getName())
                    .category(request.getCategory())
                    .cost(request.getCost())
                    .description(request.getDescription())
                    .image(request.getImage())
                    .ingredients(request.getIngredients())
                    .steps(request.getSteps())
                    .createDateTime(currentDateTimeStr)
                    .build();

            //If Recipe of the same name and user exists, throws IllegalArgumentException
            if (recipeRepository.findByNameAndUserId(request.getName(), id).isPresent()) {
                throw new IllegalArgumentException("Duplicate Recipe");
            }

            //Try saving recipe into repository
            recipeRepository.save(recipe);

        } catch (IllegalArgumentException e) {
            String err = "Bad Request: ";
            String msg;

            //If user cannot be found in the repository based on token obtained info, return ErrorResponse
            if ("Invalid Token".equals(e.getMessage())) {
                err += "Invalid Token";
                msg = "User not found";
            } else {
                err += "Duplicate Recipe";
                msg = "Please try another name for the recipe";
            }

            return ErrorResponse.builder()
                    .error(err)
                    .message(msg)
                    .build();

        } catch (Exception e) {
            //Catches any other form of exception as unknown error
            return ErrorResponse.builder()
                    .error("Internal Server Error")
                    .message("Unknown Error")
                    .build();

        }

        return SuccessResponse.builder()
                .response("Recipe has been created successfully")
                .build();

    }

    public Response delete(String recipeId, String oldEmail) {

        try {
            String id = commonService.getIdByEmail(oldEmail);

            if (recipeRepository.findByUserIdAndId(id, recipeId).isEmpty()) {

                //If Recipe cannot be found
                return ErrorResponse.builder()
                        .error("Bad Request: User has no such recipe")
                        .message("Please check the spelling of the recipe name")
                        .build();
            }

            recipeRepository.deleteByUserIdAndId(id, recipeId);

        } catch (IllegalArgumentException e) {

            //If user cannot be found in the repository based on token obtained info, return ErrorResponse
            return ErrorResponse.builder()
                    .error("Bad Request: Invalid Token")
                    .message("User not found")
                    .build();

        } catch (Exception e) {

            //Catches any other form of exception as unknown error
            return ErrorResponse.builder()
                    .error("Internal Server Error: Unknown Error")
                    .message("An unknown error has occurred! Do try again!")
                    .build();

        }

        return SuccessResponse.builder()
                .response("Recipe has been deleted successfully")
                .build();
    }

    public Response update(String recipeId, UpdateRecipeRequest request, String oldEmail) {

        try {
            String id = commonService.getIdByEmail(oldEmail);

            Recipe recipe = recipeRepository.findByUserIdAndId(id, recipeId)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Recipe"));
            recipe.setUserId(id);
            recipe.setName(request.getName());
            recipe.setCategory(request.getCategory());
            recipe.setCost(request.getCost());
            recipe.setImage(request.getImage());
            recipe.setDescription(request.getDescription());
            recipe.setIngredients(request.getIngredients());
            recipe.setSteps(request.getSteps());

            recipeRepository.save(recipe);

        } catch (IllegalArgumentException e) {

            String err = "Bad Request: ";
            String msg;

            if ("Invalid Token".equals(e.getMessage())) {
                err = "Invalid Token";
                msg = "User not found";
            } else {
                err += "Invalid Recipe";
                msg = "Recipe not found";
            }

            return ErrorResponse.builder()
                    .error(err)
                    .message(msg)
                    .build();

        } catch (Exception e) {
            //Catches any other form of exception as unknown error
            return ErrorResponse.builder()
                    .error("Internal Server Error: Unknown Error")
                    .message("An unknown error has occurred! Do try again!")
                    .build();

        }

        return SuccessResponse.builder()
                .response("Recipe has been updated successfully")
                .build();
    }

    public Response findOne(String recipeId, String oldEmail) {

        Recipe recipe = null;

        try {
            String id = commonService.getIdByEmail(oldEmail);
            recipe = recipeRepository.findByUserIdAndId(id, recipeId)
                    .orElseThrow(() -> new IllegalArgumentException("User has no such Recipe"));

        } catch (IllegalArgumentException e) {
            String err = "Bad Request: ";
            String msg;

            if ("Invalid Token".equals(e.getMessage())) {
                err = "Invalid Token";
                msg = "User not found";
            } else {
                err += "Invalid Recipe Name";
                msg = "Recipe Name not found";
            }

            return ErrorResponse.builder()
                    .error(err)
                    .message(msg)
                    .build();

        } catch (Exception e) {
            //Catches any other form of exception as unknown error
            return ErrorResponse.builder()
                    .error("Internal Server Error: Unknown Error")
                    .message("An unknown error has occurred! Do try again!")
                    .build();

        }

        return SingleRecipeResponse.builder()
                .recipe(recipe)
                .build();

    }

    public Response findAll(String oldEmail) {

        List<Recipe> recipes = null;

        try {
            String id = commonService.getIdByEmail(oldEmail);
//            recipes = recipeRepository.findAllByUserId(id);
            recipes = recipeRepository.findAllByUserIdOrderByCreateDateTimeDesc(id);

        } catch (IllegalArgumentException e) {

            if (e.getMessage().equals("Invalid Token")) {
                //If user cannot be found in the repository based on token obtained info, return ErrorResponse
                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Token")
                        .message("User not found")
                        .build();
            }

        } catch (Exception e) {
            //Catches any other form of exception as unknown error
            return ErrorResponse.builder()
                    .error("Internal Server Error: Unknown Error")
                    .message("An unknown error has occurred! Do try again!")
                    .build();

        }

        return MultipleRecipeResponse.builder()
                .recipes(recipes)
                .build();

    }
}
