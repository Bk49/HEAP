package com.heap.backend.data.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomErrorResponse extends AuthenticationResponse{
    private String message;

    public CustomErrorResponse(AuthenticationResponse response, String message) {
        super.setToken(response.getToken());
        this.message = message;
    }
}
