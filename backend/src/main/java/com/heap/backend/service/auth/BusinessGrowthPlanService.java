package com.heap.backend.service.auth;

import com.heap.backend.data.request.CreateBusinessGrowthPlanRequest;
import com.heap.backend.data.response.*;
import com.heap.backend.models.*;
import com.heap.backend.repository.BusinessGrowthPlanRepository;
import com.heap.backend.repository.MenuRepository;
import com.heap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class BusinessGrowthPlanService {

    private final UserRepository userRepository;
    private final MenuRepository menuRepository;
    private final BusinessGrowthPlanRepository businessGrowthPlanRepository;

    public Response create(CreateBusinessGrowthPlanRequest request, String oldEmail) {

        try {

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            /*
             * Error Handling Required/Missing things:
             * 1. Date cannot be saved currently
             */

            //Ensures all fields have been filled
            if (request.getPlanName() == null || request.getPlanType() == null) {

                throw new IllegalArgumentException("Missing Plan Fields");

            }

            //Ensures that user does not have a plan name by the same planName
            if (businessGrowthPlanRepository.findByUserIdAndPlanName(id, request.getPlanName()).isPresent()) {

                throw new IllegalArgumentException("Duplicate Plan Name");

            }


            //Create Strategy based on planType
            Strategy strategy;
            //1. If Food Delivery Marketing Strategy, Create FoodDeliveryMarketingStrategy
            if ("FD".equals(request.getPlanType())) {

                //Check if menuID is legit
                if (menuRepository.findById(request.getMenuId()).isEmpty()) {
                    throw new IllegalArgumentException("No such Menu");
                }

                strategy = FoodDeliveryMarketingStrategy.builder()
                        .menuId(request.getMenuId())
                        .containers(request.getContainers())
                        .build();
            } else {
                strategy = null;
            }

            //Create BusinessGrowthPlan
            BusinessGrowthPlan businessGrowthPlan = BusinessGrowthPlan.builder()
                    .userId(id)
                    .planName(request.getPlanName())
                    .priority(request.getPriority())
                    .planType(request.getPlanType())
                    .startDate(request.getStartDate())
                    .endDate(request.getEndDate())
                    .strategy(strategy)
                    .build();

            businessGrowthPlanRepository.save(businessGrowthPlan);

        } catch (IllegalArgumentException e) {

            if (e.getMessage().equals("Invalid Token")) {

                //If user cannot be found in the repository based on token obtained info, return ErrorResponse
                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Token")
                        .message("User not found")
                        .build();

            } else if (e.getMessage().equals("Missing Plan Fields")) {

                //If fields are not completely filled, return ErrorResponse
                return ErrorResponse.builder()
                        .error("Bad Request: Missing Fields")
                        .message("Please ensure all fields have been filled")
                        .build();

            } else if (e.getMessage().equals("No such Menu")) {

                //If menu cannot be found in the repository based on menuID, return ErrorResponse
                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Menu")
                        .message("Please ensure menu ID is valid")
                        .build();

            } else {

                //If Plan Name is Duplicated, return ErrorResponse
                return ErrorResponse.builder()
                        .error("Bad Request: Duplicated Plan Name")
                        .message("Please ensure that plan name has not been used before")
                        .build();

            }

        } catch (Exception e) {

            //Catches any other form of exception as unknown error
            return ErrorResponse.builder()
                    .error("Internal Server Error: Unknown Error")
                    .message(e.getMessage())
                    //.message("An unknown error has occurred! Do try again!")
                    .build();

        }

        return SuccessResponse.builder()
                .response("Business Growth Plan has been created successfully")
                .build();
    }
}
