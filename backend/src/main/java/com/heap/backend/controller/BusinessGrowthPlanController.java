package com.heap.backend.controller;

import com.heap.backend.data.request.*;
import com.heap.backend.data.response.ErrorResponse;
import com.heap.backend.data.response.Response;
import com.heap.backend.service.auth.BusinessGrowthPlanService;
import com.heap.backend.service.auth.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class BusinessGrowthPlanController {

    private final BusinessGrowthPlanService businessGrowthPlanService;
    private final JwtService jwtService;

    @PostMapping("/createBGP")
    public ResponseEntity<Response> create (@RequestBody CreateBusinessGrowthPlanRequest request, @RequestHeader ("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = returnOldEmail(token);
        return checkResponse(businessGrowthPlanService.create(request, oldEmail));
    }

//    @PostMapping("/deleteBGP")
//    public ResponseEntity<Response> delete (@RequestBody DeleteMenuRequest request, @RequestHeader ("Authorization") String token) {
//
//        //Obtaining jwt token and email from jwt token
//        String oldEmail = returnOldEmail(token);
//        return checkResponse(businessGrowthPlanService.delete(request, oldEmail));
//    }
//
//    @PutMapping ("/updateBGP/{BGPId}")
//    public ResponseEntity<Response> delete (@PathVariable String BGPId, @RequestBody UpdateMenuRequest request, @RequestHeader ("Authorization") String token) {
//
//        //Obtaining jwt token and email from jwt token
//        String oldEmail = returnOldEmail(token);
//        return checkResponse(businessGrowthPlanService.update(BGPId, request, oldEmail));
//    }
//
//    @PostMapping ("/findMenu")
//    public ResponseEntity<Response> findOne (@RequestBody FindMenuRequest request, @RequestHeader ("Authorization") String token) {
//
//        //Obtaining jwt token and email from jwt token
//        String oldEmail = returnOldEmail(token);
//        return checkResponse(businessGrowthPlanService.findOne(request, oldEmail));
//    }
//
//    @GetMapping ("/findAllMenu")
//    public ResponseEntity<Response> findAll (@RequestHeader ("Authorization") String token) {
//
//        //Obtaining jwt token and email from jwt token
//        String oldEmail = returnOldEmail(token);
//        return checkResponse(businessGrowthPlanService.findAll(oldEmail));
//    }



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
