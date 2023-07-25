package com.heap.backend.service;

import com.heap.backend.data.response.Response;
import com.heap.backend.data.response.common.ErrorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommonService {
    @Bean
    public ResponseEntity<Response> checkResponse(Response response) {
        if (response instanceof ErrorResponse errorResponse) {
            return errorResponse.getMessage().contains("Bad Request")
                    ? ResponseEntity.badRequest().body(errorResponse)
                    : ResponseEntity.internalServerError().body(errorResponse);
        }

        return ResponseEntity.ok(response);
    }
}
