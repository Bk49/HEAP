package com.heap.backend.service.auth;

import com.heap.backend.data.request.CreateBusinessGrowthPlanRequest;
import com.heap.backend.data.response.*;
import com.heap.backend.models.User;
import com.heap.backend.repository.BusinessGrowthPlanRepository;
import com.heap.backend.repository.UserRepository;
import com.sun.jdi.request.ExceptionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class BusinessGrowthPlanService {

    private final UserRepository userRepository;
    private final BusinessGrowthPlanRepository businessGrowthPlanRepository;

    public Response create(CreateBusinessGrowthPlanRequest request, String oldEmail) {

        try {

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            System.out.println(request.getStartDate().toString());
            System.out.println(request.getEndDate().toString());

        } catch (Exception e) {

            //Catches any other form of exception as unknown error
            return ErrorResponse.builder()
                    .error("Internal Server Error: Unknown Error")
                    .message("An unknown error has occurred! Do try again!")
                    .build();

        }

        return SuccessResponse.builder()
                .response("Business Growth Plan has been created successfully")
                .build();
    }
}
