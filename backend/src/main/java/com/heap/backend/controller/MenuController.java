package com.heap.backend.controller;

import com.heap.backend.data.request.CreateMenuRequest;
import com.heap.backend.data.request.DeleteMenuRequest;
import com.heap.backend.data.request.UpdateMenuRequest;
import com.heap.backend.data.response.Response;
import com.heap.backend.data.response.ErrorResponse;
import com.heap.backend.service.auth.JwtService;
import com.heap.backend.service.auth.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;
    private final JwtService jwtService;

    @PostMapping("/createMenu")
    public ResponseEntity<Response> create (@RequestBody CreateMenuRequest request, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = returnOldEmail(token);
        return checkResponse(menuService.create(request, oldEmail));
    }

    @DeleteMapping("/deleteMenu/{menuId}")
    public ResponseEntity<Response> delete (@PathVariable String menuId, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = returnOldEmail(token);
        return checkResponse(menuService.delete(menuId, oldEmail));
    }

    @PutMapping ("/updateMenu/{id}")
    public ResponseEntity<Response> delete (@PathVariable String id, @RequestBody UpdateMenuRequest request, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = returnOldEmail(token);
        return checkResponse(menuService.update(id, request, oldEmail));
    }

    @GetMapping ("/findMenu/{menuId}")
    public ResponseEntity<Response> findOne (@PathVariable String menuId, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = returnOldEmail(token);
        return checkResponse(menuService.findOne(menuId, oldEmail));
    }

    @GetMapping ("/findAllMenu")
    public ResponseEntity<Response> findAll (@RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = returnOldEmail(token);
        return checkResponse(menuService.findAll(oldEmail));
    }



    public String returnOldEmail(String token) {

        String jwt = token.substring(7);
        return jwtService.extractEmail(jwt);

    }

    public ResponseEntity<Response> checkResponse(Response response) {

        if (response instanceof ErrorResponse errorResponse) {

            if (errorResponse.getMessage().contains("Bad Request")) {

                return ResponseEntity.badRequest().body(errorResponse);

            } else {

                return ResponseEntity.internalServerError().body(errorResponse);
            }

        }

        return ResponseEntity.ok(response);
    }
}
