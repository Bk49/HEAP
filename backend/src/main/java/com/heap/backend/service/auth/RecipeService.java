package com.heap.backend.service.auth;

import com.heap.backend.data.request.CreateMenuRequest;
import com.heap.backend.data.request.CreateRecipeRequest;
import com.heap.backend.data.response.*;
import com.heap.backend.models.Menu;
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
            return CreateRecipeErrorResponse.builder()
                    .error("Internal Server Error")
                    .message("Unknown Error")
                    .build();
        }

        return CreateRecipeResponse.builder()
                .response("Recipe updated successfully")
                .build();


    }
}
