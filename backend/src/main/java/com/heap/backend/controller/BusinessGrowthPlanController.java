package com.heap.backend.controller;

import com.heap.backend.data.request.business.CreateBusinessGrowthPlanRequest;
import com.heap.backend.data.request.business.UpdateBusinessGrowthPlanRequest;
import com.heap.backend.data.response.Response;
import com.heap.backend.service.BusinessGrowthPlanService;
import com.heap.backend.service.CommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class BusinessGrowthPlanController {
    private final CommonService commonService;
    private final BusinessGrowthPlanService businessGrowthPlanService;

    @PostMapping("/createBGP")
    public ResponseEntity<Response> create(@RequestBody CreateBusinessGrowthPlanRequest request, @RequestHeader("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(businessGrowthPlanService.create(request, oldEmail));
    }

    @DeleteMapping("/deleteBGP/{bgpId}")
    public ResponseEntity<Response> delete(@PathVariable String bgpId, @RequestHeader("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(businessGrowthPlanService.delete(bgpId, oldEmail));
    }

    @PutMapping("/updateBGP/{bgpId}")
    public ResponseEntity<Response> delete(@PathVariable String bgpId, @RequestBody UpdateBusinessGrowthPlanRequest request, @RequestHeader("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(businessGrowthPlanService.update(bgpId, request, oldEmail));
    }

    @GetMapping("/findBGP/{bgpId}")
    public ResponseEntity<Response> findOne(@PathVariable String bgpId, @RequestHeader("Authorization") String token) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(businessGrowthPlanService.findOne(bgpId, oldEmail));
    }

    @GetMapping("/findAllBGP")
    public ResponseEntity<Response> findAll(@RequestHeader("Authorization") String token, @RequestParam(required = false) String order, @RequestParam(required = false) String sortby) {

        //Obtaining jwt token and email from jwt token
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(businessGrowthPlanService.findAll(oldEmail, order, sortby));
    }

}
