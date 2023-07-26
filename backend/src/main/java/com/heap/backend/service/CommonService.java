package com.heap.backend.service;

import com.heap.backend.data.response.Response;
import com.heap.backend.data.response.common.ErrorResponse;
import com.heap.backend.models.user.User;
import com.heap.backend.repository.UserRepository;
import com.heap.backend.service.auth.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommonService {
    //    This defaultResponse is on purpose so that it @Autowires DefaultResponse class instead of Response implementation
    private final Response defaultResponse;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public ResponseEntity<Response> checkResponse(Response response) {
        if (response instanceof ErrorResponse errorResponse) {
            return errorResponse.getMessage().contains("Bad Request")
                    ? ResponseEntity.badRequest().body(errorResponse)
                    : ResponseEntity.internalServerError().body(errorResponse);
        }

        return ResponseEntity.ok(response);
    }

    public String returnOldEmail(String token) {
        String jwt = token.substring(7);
        return jwtService.extractEmail(jwt);
    }

    public String getIdByEmail(String email) {
        User origUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
        return origUser.getId();
    }
}
