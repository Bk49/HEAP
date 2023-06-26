package com.heap.backend.data.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationErrorResponse extends AuthenticationResponse{
    private String error;
    private String message;
}
