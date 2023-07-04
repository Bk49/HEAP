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

    @PostMapping("/deleteMenu")
    public ResponseEntity<Response> delete (@RequestBody DeleteMenuRequest request, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = returnOldEmail(token);
        return checkResponse(menuService.delete(request, oldEmail));
    }

    @PutMapping ("/updateMenu/{id}")
    public ResponseEntity<Response> delete (@PathVariable String id, @RequestBody UpdateMenuRequest request, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = returnOldEmail(token);
        return checkResponse(menuService.update(id, request, oldEmail));
    }

    public String returnOldEmail(String token) {

        String jwt = token.substring(7);
        return jwtService.extractEmail(jwt);

    }

    public ResponseEntity<Response> checkResponse(Response response) {

        if (response instanceof ErrorResponse) {

            ErrorResponse errorResponse = (ErrorResponse) response;

            if (errorResponse.getMessage().contains("Bad Request")) {

                return ResponseEntity.badRequest().body(errorResponse);

            } else {

                return ResponseEntity.internalServerError().body(errorResponse);
            }

        }

        return ResponseEntity.ok(response);
    }
}
