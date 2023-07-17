package com.heap.backend.service.auth;

import com.heap.backend.data.request.CreateRecipeRequest;
import com.heap.backend.data.request.UpdateRecipeRequest;
import com.heap.backend.data.response.*;
import com.heap.backend.models.Recipe;
import com.heap.backend.models.User;
import com.heap.backend.repository.RecipeRepository;
import com.heap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeService {
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    public Response create(CreateRecipeRequest request, String oldEmail) {

        try {
            User origUser = userRepository.findByEmail(oldEmail).orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

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
                    .build();

            //If Recipe of the same name and user exists, throws IllegalArgumentException
            if (recipeRepository.findByNameAndUserId(request.getName(), id).isPresent()) {

                throw new IllegalArgumentException("Duplicate Recipe");

            }

            //Try saving recipe into repository
            recipeRepository.save(recipe);

        } catch (IllegalArgumentException e) {

            //If user cannot be found in the repository based on token obtained info, return ErrorResponse
            if ("Invalid Token".equals(e.getMessage())) {

                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Token")
                        .message("User not found")
                        .build();

            } else {

                return ErrorResponse.builder()
                        .error("Bad Request: Duplicate Recipe")
                        .message("Please try another name for the recipe")
                        .build();

            }

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
            User origUser = userRepository.findByEmail(oldEmail).orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

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

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

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

            if (e.getMessage().equals("Invalid Token")) {

                //If user cannot be found in the repository based on token obtained info, return ErrorResponse
                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Token")
                        .message("User not found")
                        .build();

            }

            return  ErrorResponse.builder()
                    .error("Bad Request: Invalid Recipe")
                    .message("Recipe not found")
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

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            recipe = recipeRepository.findByUserIdAndId(id, recipeId)
                    .orElseThrow(() -> new IllegalArgumentException("User has no such Recipe"));

        } catch (IllegalArgumentException e) {

            if (e.getMessage().equals("Invalid Token")) {

                //If user cannot be found in the repository based on token obtained info, return ErrorResponse
                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Token")
                        .message("User not found")
                        .build();

            } else {

                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Recipe Name")
                        .message("Recipe Name not found")
                        .build();

            }

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

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            recipes = recipeRepository.findAllByUserId(id);

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
