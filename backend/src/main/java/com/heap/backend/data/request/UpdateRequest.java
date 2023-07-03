package com.heap.backend.data.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRequest {
    private String email;
    private String password;
    private String confirmPassword;

    private String businessName;
    private String businessType;
    private String[] cuisineType;
    private boolean isFusion;
    private String postalCode;
    private String storeAddress;
}
