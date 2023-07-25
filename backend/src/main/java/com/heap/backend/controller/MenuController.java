package com.heap.backend.controller;

import com.heap.backend.data.request.menu.CreateMenuRequest;
import com.heap.backend.data.request.menu.UpdateMenuRequest;
import com.heap.backend.data.response.Response;
import com.heap.backend.service.CommonService;
import com.heap.backend.service.auth.JwtService;
import com.heap.backend.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class MenuController {
    private final CommonService commonService;
    private final MenuService menuService;
    private final JwtService jwtService;

    @PostMapping("/createMenu")
    public ResponseEntity<Response> create(@RequestBody CreateMenuRequest request, @RequestHeader("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(menuService.create(request, oldEmail));
    }

    @DeleteMapping("/deleteMenu/{menuId}")
    public ResponseEntity<Response> delete(@PathVariable String menuId, @RequestHeader("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(menuService.delete(menuId, oldEmail));
    }

    @PutMapping("/updateMenu/{id}")
    public ResponseEntity<Response> update(@PathVariable String id, @RequestBody UpdateMenuRequest request, @RequestHeader("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(menuService.update(id, request, oldEmail));
    }

    @GetMapping("/findMenu/{menuId}")
    public ResponseEntity<Response> findOne(@PathVariable String menuId, @RequestHeader("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(menuService.findOne(menuId, oldEmail));
    }

    @GetMapping("/findAllMenu")
    public ResponseEntity<Response> findAll(@RequestHeader("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(menuService.findAll(oldEmail));
    }

}
