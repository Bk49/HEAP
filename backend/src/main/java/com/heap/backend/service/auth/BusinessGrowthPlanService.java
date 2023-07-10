package com.heap.backend.service.auth;

import com.heap.backend.data.request.*;
import com.heap.backend.data.response.*;
import com.heap.backend.models.*;
import com.heap.backend.repository.BusinessGrowthPlanRepository;
import com.heap.backend.repository.MenuRepository;
import com.heap.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


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
            Strategy strategy = null;

            if ("FD".equals(request.getPlanType())) {

                //1. If Food Delivery Marketing Strategy, Create FoodDeliveryMarketingStrategy

                //Check if menuID is legit
                if (menuRepository.findById(request.getMenuId()).isEmpty()) {
                    throw new IllegalArgumentException("No such Menu");
                }

                //Create FoodDeliveryMarketingStrategy
                strategy = FoodDeliveryMarketplaceStrategy.builder()
                        .menuId(request.getMenuId())
                        .containers(request.getContainers())
                        .build();

            } else if ("MK".equals(request.getPlanType())) {
                //2. If Marketing, Create MarketingStrategy

                //Decide which type of MarketingMethod to create based on method field
                MarketingMethod marketingMethod = null;
                if ("SM".equals(request.getMethod())) {
                    //2.1. If Social Media, Create SocialMediaMarketingMethod
                    marketingMethod = SocialMediaMarketingMethod.builder()
                            .promotionName(request.getPromotionName())
                            .promoStartDate(request.getPromoStartDate())
                            .promoEndDate(request.getPromoEndDate())
                            .promoDescription(request.getPromoDescription())
                            .promoTnC(request.getPromoTnC())
                            .influencer(request.getInfluencer())
                            .platform(request.getPlatform())
                            .contents(request.getContents())
                            .platformCost(request.getPlatformCost())
                            .platformDuration(request.getPlatformDuration())
                            .platformRate(request.getPlatformRate())
                            .build();

                } else if ("PB".equals(request.getMethod())) {
                    //2.2. If Poster and Banner, Create PosterAndBannerMarketingMethod
                    marketingMethod = PosterAndBannerMarketingMethod.builder()
                            .promotionName(request.getPromotionName())
                            .promoStartDate(request.getPromoStartDate())
                            .promoEndDate(request.getPromoEndDate())
                            .promoDescription(request.getPromoDescription())
                            .promoTnC(request.getPromoTnC())
                            .influencer(request.getInfluencer())
//                            .posterDesign(request.getPosterDesign())
                            .posterCost(request.getPosterCost())
                            .posterQuantity(request.getPosterQuantity())
                            .build();

                } else if ("FD".equals(request.getMethod())) {
                    //2.3. If Flyer Distribution, Create FlyerDistributionMarketingMethod
                    marketingMethod = FlyerDistributionMarketingMethod.builder()
                            .promotionName(request.getPromotionName())
                            .promoStartDate(request.getPromoStartDate())
                            .promoEndDate(request.getPromoEndDate())
                            .promoDescription(request.getPromoDescription())
                            .promoTnC(request.getPromoTnC())
                            .influencer(request.getInfluencer())
//                            .flyerDesign(request.getFlyerDesign())
                            .flyerCost(request.getFlyerCost())
                            .flyerQuantity(request.getFlyerQuantity())
                            .build();

                }

                //Create MarketingStrategy
                strategy = MarketingStrategy.builder()
                        .method(request.getMethod())
                        .marketingMethod(marketingMethod)
                        .build();

            } else if ("OE".equals(request.getPlanType())) {

                //3. If Outlet Expansion, Create OutletExpansionStrategy
                strategy = OutletExpansionStrategy.builder()
                        .address(request.getAddress())
                        .rentalPrice(request.getRentalPrice())
                        .renovation(request.getRenovation())
                        .staffs(request.getStaffs())
                        .build();

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

    public Response delete(DeleteBusinessGrowthPlanRequest request, String oldEmail) {

        try {

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            if (businessGrowthPlanRepository.findByUserIdAndPlanName(id, request.getName()).isEmpty()) {

                throw new IllegalArgumentException("No Such Business Growth Plan");

            }

            businessGrowthPlanRepository.deleteByUserIdAndPlanName(id, request.getName());

        } catch (IllegalArgumentException e) {

            if ("Invalid Token".equals(e.getMessage())) {

                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Token")
                        .message("User not found")
                        .build();

            } else {
                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Business Growth Plan")
                        .message("Business Growth Plan not found")
                        .build();

            }

        } catch (Exception e) {

            //Catches any other form of exception as unknown error
            return ErrorResponse.builder()
                    .error("Internal Server Error")
                    .message("Unknown Error")
                    .build();
        }

        return SuccessResponse.builder()
                .response("Business Growth Plan has been deleted successfully")
                .build();
    }

    public Response update(String planId, UpdateBusinessGrowthPlanRequest request, String oldEmail) {

        try {

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            BusinessGrowthPlan businessGrowthPlan = businessGrowthPlanRepository.findByIdAndUserId(planId, id)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Business Growth Plan"));

            //Create Strategy based on planType
            Strategy strategy = null;

            //DEBUG: WHY DOES CODE KEEP GOING INTO FIRST IF, ALTHOUGH request plan type is "OE"

            if ("FD".equals(request.getPlanType())) {

                //1. If Food Delivery Marketing Strategy, Create FoodDeliveryMarketingStrategy

                //Check if menuID is legit
                if (menuRepository.findById(request.getMenuId()).isEmpty()) {
                    throw new IllegalArgumentException("No such Menu");
                }

                //Create FoodDeliveryMarketingStrategy
                strategy = FoodDeliveryMarketplaceStrategy.builder()
                        .menuId(request.getMenuId())
                        .containers(request.getContainers())
                        .build();

            } else if ("MK".equals(request.getPlanType())) {
                //2. If Marketing, Create MarketingStrategy

                //Decide which type of MarketingMethod to create based on method field
                MarketingMethod marketingMethod = null;
                if ("SM".equals(request.getMethod())) {
                    //2.1. If Social Media, Create SocialMediaMarketingMethod
                    marketingMethod = SocialMediaMarketingMethod.builder()
                            .promotionName(request.getPromotionName())
                            .promoStartDate(request.getPromoStartDate())
                            .promoEndDate(request.getPromoEndDate())
                            .promoDescription(request.getPromoDescription())
                            .promoTnC(request.getPromoTnC())
                            .influencer(request.getInfluencer())
                            .platform(request.getPlatform())
                            .contents(request.getContents())
                            .platformCost(request.getPlatformCost())
                            .platformDuration(request.getPlatformDuration())
                            .platformRate(request.getPlatformRate())
                            .build();

                } else if ("PB".equals(request.getMethod())) {
                    //2.2. If Poster and Banner, Create PosterAndBannerMarketingMethod
                    marketingMethod = PosterAndBannerMarketingMethod.builder()
                            .promotionName(request.getPromotionName())
                            .promoStartDate(request.getPromoStartDate())
                            .promoEndDate(request.getPromoEndDate())
                            .promoDescription(request.getPromoDescription())
                            .promoTnC(request.getPromoTnC())
                            .influencer(request.getInfluencer())
//                            .posterDesign(request.getPosterDesign())
                            .posterCost(request.getPosterCost())
                            .posterQuantity(request.getPosterQuantity())
                            .build();

                } else if ("FD".equals(request.getMethod())) {
                    //2.3. If Flyer Distribution, Create FlyerDistributionMarketingMethod
                    marketingMethod = FlyerDistributionMarketingMethod.builder()
                            .promotionName(request.getPromotionName())
                            .promoStartDate(request.getPromoStartDate())
                            .promoEndDate(request.getPromoEndDate())
                            .promoDescription(request.getPromoDescription())
                            .promoTnC(request.getPromoTnC())
                            .influencer(request.getInfluencer())
//                            .flyerDesign(request.getFlyerDesign())
                            .flyerCost(request.getFlyerCost())
                            .flyerQuantity(request.getFlyerQuantity())
                            .build();

                }

                //Create MarketingStrategy
                strategy = MarketingStrategy.builder()
                        .method(request.getMethod())
                        .marketingMethod(marketingMethod)
                        .build();

            } else if ("OE".equals(request.getPlanType())) {

                //3. If Outlet Expansion, Create OutletExpansionStrategy
                strategy = OutletExpansionStrategy.builder()
                        .address(request.getAddress())
                        .rentalPrice(request.getRentalPrice())
                        .renovation(request.getRenovation())
                        .staffs(request.getStaffs())
                        .build();

            }

            //Create BusinessGrowthPlan
            businessGrowthPlan.setUserId(id);
            businessGrowthPlan.setPlanName(request.getPlanName());
            businessGrowthPlan.setPriority(request.getPriority());
            businessGrowthPlan.setStartDate(request.getStartDate());
            businessGrowthPlan.setEndDate(request.getEndDate());
            businessGrowthPlan.setStrategy(strategy);

            businessGrowthPlanRepository.save(businessGrowthPlan);


        } catch (IllegalArgumentException e) {

            if (e.getMessage().equals("Invalid Token")) {

                //If user cannot be found in the repository based on token obtained info, return ErrorResponse
                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Token")
                        .message("User not found")
                        .build();

            } else if (e.getMessage().equals("No such Menu")) {

                //If menu cannot be found in the repository based on menuID, return ErrorResponse
                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Menu")
                        .message("Please ensure menu ID is valid")
                        .build();

            } else {

                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Business Growth Plan")
                        .message("Business Growth Plan not found")
                        .build();
            }

        } catch (Exception e) {

            //Catches any other form of exception as unknown error
            return ErrorResponse.builder()
                    .error("Internal Server Error: Unknown Error")
                    .message("An unknown error has occurred! Do try again!")
                    .build();

        }

        return SuccessResponse.builder()
                .response("Business Growth Plan has been updated successfully")
                .build();
    }

    public Response findOne(FindBusinessGrowthPlanRequest request, String oldEmail) {

        BusinessGrowthPlan businessGrowthPlan;

        try {

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            businessGrowthPlan = businessGrowthPlanRepository.findByUserIdAndPlanName(id, request.getName())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Plan"));

        } catch (IllegalArgumentException e) {

            if (e.getMessage().equals("Invalid Token")) {

                //If user cannot be found in the repository based on token obtained info, return ErrorResponse
                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Token")
                        .message("User not found")
                        .build();

            } else {

                return ErrorResponse.builder()
                        .error("Bad Request: Invalid Business Growth Plan")
                        .message("Business Growth Plan not found")
                        .build();
            }

        } catch (Exception e) {

            //Catches any other form of exception as unknown error
            return ErrorResponse.builder()
                    .error("Internal Server Error: Unknown Error")
                    .message("An unknown error has occurred! Do try again!")
                    .build();

        }

        return SingleBusinessGrowthPlanResponse.builder()
                .businessGrowthPlan(businessGrowthPlan)
                .build();
    }

    public Response findAll(String oldEmail) {

        List<BusinessGrowthPlan> businessGrowthPlans = new ArrayList<>();

        try {

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            List<BusinessGrowthPlan> search = businessGrowthPlanRepository.findAllByUserId(id);
            for (BusinessGrowthPlan bgp : search) {
                businessGrowthPlans.add(bgp);
            }

            //Ordering of businessGrowthPlans missing (To be worked on)

        } catch (IllegalArgumentException e) {

            //If user cannot be found in the repository based on token obtained info, return ErrorResponse
            return ErrorResponse.builder()
                    .error("Bad Request: Invalid Token")
                    .message("User not found")
                    .build();

        } catch (Exception e) {

            //Catches any other form of exception as unknown error
            return ErrorResponse.builder()
                    .error("Internal Server Error: Unknown Error")
                    .message(e.getMessage())
                    //.message("An unknown error has occurred! Do try again!")
                    .build();

        }

        return MultipleBusinessGrowthPlanResponse.builder()
                .businessGrowthPlans(businessGrowthPlans)
                .build();

    }

}
