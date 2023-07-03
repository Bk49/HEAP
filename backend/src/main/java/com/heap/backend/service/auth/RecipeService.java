package com.heap.backend.service.auth;

import com.heap.backend.data.request.CreateMenuRequest;
import com.heap.backend.data.request.CreateRecipeRequest;
import com.heap.backend.data.response.CreateMenuErrorResponse;
import com.heap.backend.data.response.CreateMenuResponse;
import com.heap.backend.data.response.CreateRecipeResponse;
import com.heap.backend.data.response.Response;
import com.heap.backend.models.Menu;
import com.heap.backend.models.Recipe;
import com.heap.backend.models.User;
import com.heap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecipeService {
    private final UserRepository repository;

    public Response create(CreateRecipeRequest request) {

        String oldEmail = "John2@gmail.com";    //Debugging line! Hardcode

        Recipe recipe = Recipe.builder()
                .name(request.getName())
                .category(request.getCategory())
                .cost(request.getCost())
                .description(request.getDescription())
                .image(request.getImage())
                .ingredients(request.getIngredients())
                .steps(request.getSteps())
                .build();

        User origUser = repository.findByEmail(oldEmail).orElseThrow();
        User user = origUser.duplicate();           //Need fine tune the duplicate class

        return CreateRecipeResponse.builder()
                .response("Recipe updated successfully")
                .build();


    }
}
