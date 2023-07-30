package com.heap.backend.data.request.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProfileRequest {
    private String email;
    private String password;
    private String confirmPassword;

    private String businessName;
    private String businessType;
    private String[] cuisineType;
    private boolean isFusion;
    private String postalCode;
    private String storeAddress;
    private double budget;
}
