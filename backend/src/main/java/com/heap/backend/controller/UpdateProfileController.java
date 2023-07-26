package com.heap.backend.controller;

import com.heap.backend.data.request.user.UpdateProfileRequest;
import com.heap.backend.data.response.Response;
import com.heap.backend.service.CommonService;
import com.heap.backend.service.UpdateProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UpdateProfileController {
    private final CommonService commonService;
    private final UpdateProfileService updateProfileService;

    @PutMapping("/update")
    public ResponseEntity<Response> update(@RequestBody UpdateProfileRequest request, @RequestHeader("Authorization") String token) {
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(updateProfileService.update(request, oldEmail));
    }

    @GetMapping("/findUser")
    public ResponseEntity<Response> findOne(@RequestHeader("Authorization") String token) {
        String oldEmail = commonService.returnOldEmail(token);
        return commonService.checkResponse(updateProfileService.findOne(oldEmail));
    }
}
