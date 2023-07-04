package com.heap.backend.service.auth;

import com.heap.backend.data.request.CreateMenuRequest;
import com.heap.backend.data.response.*;
import com.heap.backend.models.Menu;
import com.heap.backend.models.Recipe;
import com.heap.backend.models.User;
import com.heap.backend.repository.RecipeRepository;
import com.heap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    public Response create(CreateMenuRequest request, String oldEmail) {

        try {
            User origUser = userRepository.findByEmail(oldEmail).orElseThrow(() -> new IllegalArgumentException("Invalid Token"));

            Menu menu = Menu.builder()
                    .name(request.getName())
                    .type(request.getType())
                    .sections(request.getSections())
                    .build();

            //Search through the menu ArrayList of Specific user and checks if a similar menu is present
            List<Menu> menuList = origUser.getBusiness().getMenuList();
            for (int i = 0 ; i < menuList.size() ; i++) {

                if (menu.equals(menuList.get(i))) {

                    throw new IllegalArgumentException("Repeat Menu");

                }

            }

            //If all goes well, add in new menu into business details
            origUser.getBusiness().getMenuList().add(menu);

            //Try saving
            userRepository.save(origUser);

        } catch (IllegalArgumentException e) {

            //If user cannot be found in the repository based on token obtained info, return ErrorResponse
            if ("Invalid Token".equals(e.getMessage())) {

                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Token")
                        .message("User not found")
                        .build();

            } else {

                return ErrorResponse.builder()
                        .error("Bad Request: Duplicate Menu")
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
                .response("Menu updated successfully")
                .build();
    }

}
