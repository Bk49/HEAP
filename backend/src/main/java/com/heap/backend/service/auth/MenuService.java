package com.heap.backend.service.auth;

import com.heap.backend.data.request.*;
import com.heap.backend.data.response.*;
import com.heap.backend.models.*;
import com.heap.backend.repository.MenuRepository;
import com.heap.backend.repository.RecipeRepository;
import com.heap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final MenuRepository menuRepository;

    public Response create(CreateMenuRequest request, String oldEmail) {

        try {
            User origUser = userRepository.findByEmail(oldEmail).orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            Menu menu = Menu.builder()
                    .userId(id)
                    .name(request.getName())
                    .type(request.getType())
                    .sections(request.getSections())
                    .build();

            //Checks through Items in the Menu to see if these are legit recipe in entries
            MenuSection[] menuSections = menu.getSections();

            for (MenuSection ms : menuSections) {

                for (Item i : ms.getItems()) {

                    if (recipeRepository.findByNameAndUserId(i.getItem(), id).isEmpty()) {

                        throw new IllegalArgumentException("Missing Recipe");

                    }
                }
            }

            //Search through the menu ArrayList of Specific user and checks if a similar menu is present
            if (menuRepository.findByUserIdAndName(id, request.getName()).isPresent()) {

                throw new IllegalArgumentException("Duplicate Menu");

            }

            menuRepository.save(menu);

        } catch (IllegalArgumentException e) {

            //If user cannot be found in the repository based on token obtained info, return ErrorResponse
            if ("Invalid Token".equals(e.getMessage())) {

                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Token")
                        .message("User not found")
                        .build();

            } else if ("Repeat Menu".equals(e.getMessage())) {

                return ErrorResponse.builder()
                        .error("Bad Request: Duplicate Menu")
                        .message("Please try another name for the recipe")
                        .build();

            } else {

                return ErrorResponse.builder()
                        .error("Bad Request: Recipe does not exists")
                        .message("Please ensure that items in menu have a recipe")
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
                .response("Menu has been created successfully")
                .build();
    }

    public Response delete(DeleteMenuRequest request, String oldEmail) {

        try {

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            if (menuRepository.findByUserIdAndName(id, request.getName()).isEmpty()) {

                throw new IllegalArgumentException("No Such Menu");

            }

            menuRepository.deleteByUserIdAndName(id, request.getName());

        } catch (IllegalArgumentException e) {

            if ("Invalid Token".equals(e.getMessage())) {

                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Token")
                        .message("User not found")
                        .build();

            } else {
                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Menu")
                        .message("Menu not found")
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
                .response("Menu has been deleted successfully")
                .build();
    }

    public Response update(String menuId, UpdateMenuRequest request, String oldEmail) {

        try {

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            Menu menu = menuRepository.findByIdAndUserId(menuId, id)
                    .orElseThrow(() -> new IllegalArgumentException("No such Menu"));

            menu.setName(request.getName());
            menu.setType(request.getType());
            menu.setSections(request.getSections());

            //Checks through Items in the Menu to see if these are legit recipe in entries
            MenuSection[] menuSections = menu.getSections();

            for (MenuSection ms : menuSections) {

                for (Item i : ms.getItems()) {

                    if (recipeRepository.findByNameAndUserId(i.getItem(), id).isEmpty()) {

                        throw new IllegalArgumentException("Missing Recipe");

                    }
                }
            }

            menuRepository.save(menu);

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
                .response("Menu has been updated successfully")
                .build();
    }
}
