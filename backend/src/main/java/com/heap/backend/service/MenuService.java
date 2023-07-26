package com.heap.backend.service;

import com.heap.backend.data.request.menu.CreateMenuRequest;
import com.heap.backend.data.request.menu.UpdateMenuRequest;
import com.heap.backend.data.response.*;
import com.heap.backend.data.response.common.ErrorResponse;
import com.heap.backend.data.response.common.SuccessResponse;
import com.heap.backend.data.response.menu.MultipleMenuResponse;
import com.heap.backend.data.response.menu.SingleMenuResponse;
import com.heap.backend.models.*;
import com.heap.backend.models.menu.Item;
import com.heap.backend.models.menu.Menu;
import com.heap.backend.models.menu.MenuSection;
import com.heap.backend.repository.MenuRepository;
import com.heap.backend.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final CommonService commonService;
    private final RecipeRepository recipeRepository;
    private final MenuRepository menuRepository;

    public Response create(CreateMenuRequest request, String oldEmail) {

        try {
            String id = commonService.getIdByEmail(oldEmail);
            //Generate current DateTime String
            String currentDateTimeStr = new HEAPDate().toString();

            //Checks through Items in the Menu to see if these are legit recipe in entries
            MenuSection[] menuSections = request.getSections();
            MenuSection[] storedMenuSections = Stream.of(menuSections).map((section) ->
                    MenuSection.builder()
                            .name(section.getName())
                            .items(Stream.of(section.getItems()).map((item) -> {
                                recipeRepository.findByUserIdAndId(id, item.getItem())
                                        .orElseThrow(() -> new IllegalArgumentException("Missing Recipe"));
                                return item.duplicate();
                            }).toArray(Item[]::new))
                            .build()).toArray(MenuSection[]::new);

            //Search through the menu ArrayList of Specific user and checks if a similar menu is present
            if (menuRepository.findByUserIdAndName(id, request.getName()).isPresent()) {
                throw new IllegalArgumentException("Duplicate Menu");
            }

            //If everything goes well, create StoredMenu and add it into the MenuService
            Menu storedMenu = Menu.builder()
                    .userId(id)
                    .name(request.getName())
                    .type(request.getType())
                    .image(request.getImage())
                    .createDateTime(currentDateTimeStr)
                    .sections(storedMenuSections)
                    .build();

            //If non-required field (Image) is filled
            if (request.getImage() != null) {
                storedMenu.setImage(request.getImage());
            }

            menuRepository.save(storedMenu);

        } catch (IllegalArgumentException e) {
            //If user cannot be found in the repository based on token obtained info, return ErrorResponse

            String errorMessage = e.getMessage();
            String err = "Bad Request: ";
            String msg = "";

            if ("Invalid Token".equals(errorMessage)) {
                err = "Invalid Token";
                msg = "User not found";
            } else if ("Duplicate Menu".equals(errorMessage)) {
                err += "Duplicate Menu";
                msg = "Please try another name for the recipe";
            } else {
                err += "Recipe does not exists";
                msg = "Please ensure that items in menu have a recipe";
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
                .response("Menu has been created successfully")
                .build();
    }

    public Response delete(String menuId, String oldEmail) {

        try {
            String id = commonService.getIdByEmail(oldEmail);

            if (menuRepository.findByIdAndUserId(menuId, id).isEmpty()) {

                throw new IllegalArgumentException("No Such Menu");

            }

            menuRepository.deleteByUserIdAndId(id, menuId);

        } catch (IllegalArgumentException e) {
            String err = "Bad Request: ";
            String msg = "";

            if ("Invalid Token".equals(e.getMessage())) {
                err = "Invalid Token";
                msg = "User not found";
            } else {
                err += "Invalid Menu";
                msg = "Menu not found";
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
                .response("Menu has been deleted successfully")
                .build();
    }

    public Response update(String menuId, UpdateMenuRequest request, String oldEmail) {

        try {
            String id = commonService.getIdByEmail(oldEmail);

            Menu storedMenu = menuRepository.findByIdAndUserId(menuId, id)
                    .orElseThrow(() -> new IllegalArgumentException("No such Menu"));

            storedMenu.setName(request.getName());
            storedMenu.setType(request.getType());

            if (request.getImage() != null) {
                storedMenu.setImage(request.getImage());
            }

            //Checks through Items in the Menu to see if these are legit recipe in entries
            MenuSection[] menuSections = request.getSections();
            MenuSection[] storedMenuSections = Stream.of(menuSections).map((section) ->
                    MenuSection.builder()
                            .name(section.getName())
                            .items(Stream.of(section.getItems()).map((item) -> {
                                recipeRepository.findByUserIdAndId(id, item.getItem())
                                        .orElseThrow(() -> new IllegalArgumentException("Missing Recipe"));
                                return item.duplicate();
                            }).toArray(Item[]::new))
                            .build()).toArray(MenuSection[]::new);

            storedMenu.setSections(storedMenuSections);

            menuRepository.save(storedMenu);

        } catch (IllegalArgumentException e) {
            String err = "Bad Request: ";
            String msg = "";

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
                .response("Menu has been updated successfully")
                .build();
    }

    public Response findOne(String menuId, String oldEmail) {

        Menu menu;

        try {
            String id = commonService.getIdByEmail(oldEmail);

            menu = menuRepository.findByIdAndUserId(menuId, id)
                    .orElseThrow(() -> new IllegalArgumentException("User has no such Menu"));

        } catch (IllegalArgumentException e) {
            String err = "Bad Request: ";
            String msg = "";

            if ("Invalid Token".equals(e.getMessage())) {
                err = "Invalid Token";
                msg = "User not found";
            } else {
                err += "Invalid Menu Name";
                msg = "Menu Name not found";
            }

            return ErrorResponse.builder()
                    .error(err)
                    .message(msg)
                    .build();

        } catch (Exception e) {
            //Catches any other form of exception as unknown error
            return ErrorResponse.builder()
                    .error("Internal Server Error: Unknown Error")
                    .message(e.getClass().getName())
                    //.message("An unknown error has occurred! Do try again!")
                    .build();

        }

        return SingleMenuResponse.builder()
                .menu(menu)
                .build();

    }

    public Response findAll(String oldEmail) {

        List<Menu> menus = new ArrayList<>();

        try {
            String id = commonService.getIdByEmail(oldEmail);
            menus = menuRepository.findAllByUserIdOrderByCreateDateTimeDesc(id);

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
                    .message(e.getMessage())
                    //.message("An unknown error has occurred! Do try again!")
                    .build();

        }

        return MultipleMenuResponse.builder()
                .menus(menus)
                .build();

    }
}
