package com.heap.backend.service;

import com.heap.backend.data.request.business.CreateBusinessGrowthPlanRequest;
import com.heap.backend.data.request.business.UpdateBusinessGrowthPlanRequest;
import com.heap.backend.data.response.*;
import com.heap.backend.data.response.business.MultipleBusinessGrowthPlanResponse;
import com.heap.backend.data.response.business.SingleBusinessGrowthPlanResponse;
import com.heap.backend.data.response.common.ErrorResponse;
import com.heap.backend.data.response.common.SuccessResponse;
import com.heap.backend.models.*;
import com.heap.backend.models.business.*;
import com.heap.backend.models.business.fooddelivery.FoodDeliveryMarketplacePlan;
import com.heap.backend.models.business.marketing.flyerdistribution.FlyerDistributionMarketingPlan;
import com.heap.backend.models.business.outletexpansion.OutletExpansionPlan;
import com.heap.backend.models.business.marketing.posterbanner.PosterAndBannerMarketingPlan;
import com.heap.backend.models.business.marketing.socialmedia.SocialMediaMarketingPlan;
import com.heap.backend.models.user.User;
import com.heap.backend.repository.*;
import com.heap.backend.repository.business.*;
import com.heap.backend.repository.business.marketing.FlyerDistributionMarketingRepository;
import com.heap.backend.repository.business.marketing.PosterAndBannerMarketingPlanRepository;
import com.heap.backend.repository.business.marketing.SocialMediaMarketingPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class BusinessGrowthPlanService {

    private final UserRepository userRepository;
    private final MenuRepository menuRepository;
    private final FlyerDistributionMarketingRepository flyerDistributionMarketingRepository;
    private final FoodDeliveryMarketplacePlanRepository foodDeliveryMarketplacePlanRepository;
    private final OutletExpansionPlanRepository outletExpansionPlanRepository;
    private final PosterAndBannerMarketingPlanRepository posterAndBannerMarketingPlanRepository;
    private final SocialMediaMarketingPlanRepository socialMediaMarketingPlanRepository;

    public Response create(CreateBusinessGrowthPlanRequest request, String oldEmail) {

        try {

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            //Ensures all fields have been filled (Needs work on identifying required fields)
            if (request.getPlanName() == null || request.getPlanType() == null) {

                throw new IllegalArgumentException("Missing Plan Fields");

            }

            //Ensures that user does not have a plan name by the same planName
            if (foodDeliveryMarketplacePlanRepository.findByUserIdAndPlanName(id, request.getPlanName()).isPresent() ||
                flyerDistributionMarketingRepository.findByUserIdAndPlanName(id, request.getPlanName()).isPresent() ||
                posterAndBannerMarketingPlanRepository.findByUserIdAndPlanName(id, request.getPlanName()).isPresent() ||
                socialMediaMarketingPlanRepository.findByUserIdAndPlanName(id, request.getPlanName()).isPresent() ||
                outletExpansionPlanRepository.findByUserIdAndPlanName(id, request.getPlanName()).isPresent()) {

                throw new IllegalArgumentException("Duplicate Plan Name");

            }

            //Generate current DateTime String
            String currentDateTimeStr = new HEAPDate().toString();

            //Create Plan based on planType
            if ("FD".equals(request.getPlanType())) {

                //1. If Food Delivery Marketing Strategy, Create FoodDeliveryMarketingPlan

                //Check if menuID is legit
                if (menuRepository.findById(request.getMenuId()).isEmpty()) {
                    throw new IllegalArgumentException("No such Menu");
                }

                //Create FoodDeliveryMarketingStrategy
                FoodDeliveryMarketplacePlan plan = FoodDeliveryMarketplacePlan.builder()
                        .userId(id)
                        .planName(request.getPlanName())
                        .startDate(request.getStartDate())
                        .endDate(request.getEndDate())
                        .priority(request.getPriority())
                        .planType(request.getPlanType())
                        .createDateTime(currentDateTimeStr)
                        .menuId(request.getMenuId())
                        .containers(request.getContainers())
                        .build();

                foodDeliveryMarketplacePlanRepository.save(plan);

            } else if ("MK".equals(request.getPlanType())) {
                //2. If Marketing, Create MarketingStrategy based on type of marketing strategy

                //Decide which type of MarketingMethod to create based on method field
                if ("SM".equals(request.getMethod())) {
                    //2.1. If Social Media, Create SocialMediaMarketingPlan

                    SocialMediaMarketingPlan plan  = SocialMediaMarketingPlan.builder()
                            .userId(id)
                            .planName(request.getPlanName())
                            .startDate(request.getStartDate())
                            .endDate(request.getEndDate())
                            .priority(request.getPriority())
                            .planType(request.getPlanType())
                            .createDateTime(currentDateTimeStr)
                            .method(request.getMethod())
                            .promotion(request.getPromotion())
                            .influencer(request.getInfluencer())
                            .socialMedia(request.getSocialMedia())
                            .build();

                    socialMediaMarketingPlanRepository.save(plan);

                } else if ("PB".equals(request.getMethod())) {

                    //2.2. If Poster and Banner, Create PosterAndBannerMarketingPlan

                    PosterAndBannerMarketingPlan plan  = PosterAndBannerMarketingPlan.builder()
                            .userId(id)
                            .planName(request.getPlanName())
                            .startDate(request.getStartDate())
                            .endDate(request.getEndDate())
                            .priority(request.getPriority())
                            .planType(request.getPlanType())
                            .createDateTime(currentDateTimeStr)
                            .method(request.getMethod())
                            .promotion(request.getPromotion())
                            .influencer(request.getInfluencer())
                            .posterBanner(request.getPosterBanner())
                            .build();

                    posterAndBannerMarketingPlanRepository.save(plan);

                } else if ("FD".equals(request.getMethod())) {
                    //2.3. If Flyer Distribution, Create FlyerDistributionMarketingPlan

                    FlyerDistributionMarketingPlan plan = FlyerDistributionMarketingPlan.builder()
                            .userId(id)
                            .planName(request.getPlanName())
                            .startDate(request.getStartDate())
                            .endDate(request.getEndDate())
                            .priority(request.getPriority())
                            .planType(request.getPlanType())
                            .createDateTime(currentDateTimeStr)
                            .method(request.getMethod())
                            .promotion(request.getPromotion())
                            .influencer(request.getInfluencer())
                            .flyer(request.getFlyer())
                            .build();

                    flyerDistributionMarketingRepository.save(plan);
                }

            } else if ("OE".equals(request.getPlanType())) {

                //3. If Outlet Expansion, Create OutletExpansionPlan

                OutletExpansionPlan plan  = OutletExpansionPlan.builder()
                        .userId(id)
                        .planName(request.getPlanName())
                        .startDate(request.getStartDate())
                        .endDate(request.getEndDate())
                        .priority(request.getPriority())
                        .planType(request.getPlanType())
                        .createDateTime(currentDateTimeStr)
                        .address(request.getAddress())
                        .rentalPrice(request.getRentalPrice())
                        .renovation(request.getRenovation())
                        .staffs(request.getStaffs())
                        .build();

                outletExpansionPlanRepository.save(plan);

            } else {

                throw new Exception();

            }

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

    public Response delete(String bgpId, String oldEmail) {

        try {

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            //Check each repository whether id can be found

            if (flyerDistributionMarketingRepository.findByIdAndUserId(bgpId, id).isPresent()) {

                flyerDistributionMarketingRepository.deleteByUserIdAndId(id, bgpId);

            } else if (foodDeliveryMarketplacePlanRepository.findByIdAndUserId(bgpId, id).isPresent()) {

                foodDeliveryMarketplacePlanRepository.deleteByUserIdAndId(id, bgpId);

            } else if (outletExpansionPlanRepository.findByIdAndUserId(bgpId, id).isPresent()) {

                outletExpansionPlanRepository.deleteByUserIdAndId(id, bgpId);

            } else if (posterAndBannerMarketingPlanRepository.findByIdAndUserId(bgpId, id).isPresent()) {

                posterAndBannerMarketingPlanRepository.deleteByUserIdAndId(id, bgpId);

            } else if (socialMediaMarketingPlanRepository.findByIdAndUserId(bgpId, id).isPresent()) {

                socialMediaMarketingPlanRepository.deleteByUserIdAndId(id, bgpId);

            } else {

                throw new IllegalArgumentException("Invalid Business Growth Plan");

            }

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

    public Response update(String bgpId, UpdateBusinessGrowthPlanRequest request, String oldEmail) {

        try {

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            BusinessGrowthPlan businessGrowthPlan = find(bgpId, id);

            //Create Plan based on planType
            if ("FD".equals(request.getPlanType())) {

                //1. If Food Delivery Marketing Strategy, Create FoodDeliveryMarketingPlan

                //Check if menuID is legit
                if (menuRepository.findById(request.getMenuId()).isEmpty()) {
                    throw new IllegalArgumentException("No such Menu");
                }

                //Create FoodDeliveryMarketingStrategy
                FoodDeliveryMarketplacePlan plan = FoodDeliveryMarketplacePlan.builder()
                        .id(bgpId)
                        .userId(id)
                        .planName(request.getPlanName())
                        .startDate(request.getStartDate())
                        .endDate(request.getEndDate())
                        .priority(request.getPriority())
                        .planType(request.getPlanType())
                        .menuId(request.getMenuId())
                        .containers(request.getContainers())
                        .build();

                foodDeliveryMarketplacePlanRepository.save(plan);

            } else if ("MK".equals(request.getPlanType())) {
                //2. If Marketing, Create MarketingStrategy based on type of marketing strategy

                //Decide which type of MarketingMethod to create based on method field
                if ("SM".equals(request.getMethod())) {
                    //2.1. If Social Media, Create SocialMediaMarketingPlan

                    //Ensures that user does not have a plan name by the same planName
                    if (socialMediaMarketingPlanRepository.findByUserIdAndPlanName(id, request.getPlanName()).isPresent()) {

                        throw new IllegalArgumentException("Duplicate Plan Name");

                    }

                    SocialMediaMarketingPlan plan  = SocialMediaMarketingPlan.builder()
                            .id(bgpId)
                            .userId(id)
                            .planName(request.getPlanName())
                            .startDate(request.getStartDate())
                            .endDate(request.getEndDate())
                            .priority(request.getPriority())
                            .planType(request.getPlanType())
                            .method(request.getMethod())
                            .promotion(request.getPromotion())
                            .influencer(request.getInfluencer())
                            .socialMedia(request.getSocialMedia())
                            .build();

                    socialMediaMarketingPlanRepository.save(plan);

                } else if ("PB".equals(request.getMethod())) {

                    //2.2. If Poster and Banner, Create PosterAndBannerMarketingPlan

                    //Ensures that user does not have a plan name by the same planName
                    if (posterAndBannerMarketingPlanRepository.findByUserIdAndPlanName(id, request.getPlanName()).isPresent()) {

                        throw new IllegalArgumentException("Duplicate Plan Name");

                    }

                    PosterAndBannerMarketingPlan plan  = PosterAndBannerMarketingPlan.builder()
                            .id(bgpId)
                            .userId(id)
                            .planName(request.getPlanName())
                            .startDate(request.getStartDate())
                            .endDate(request.getEndDate())
                            .priority(request.getPriority())
                            .planType(request.getPlanType())
                            .method(request.getMethod())
                            .promotion(request.getPromotion())
                            .influencer(request.getInfluencer())
                            .posterBanner(request.getPosterBanner())
                            .build();

                    posterAndBannerMarketingPlanRepository.save(plan);

                } else if ("FD".equals(request.getMethod())) {
                    //2.3. If Flyer Distribution, Create FlyerDistributionMarketingPlan

                    //Ensures that user does not have a plan name by the same planName
                    if (flyerDistributionMarketingRepository.findByUserIdAndPlanName(id, request.getPlanName()).isPresent()) {

                        throw new IllegalArgumentException("Duplicate Plan Name");

                    }

                    FlyerDistributionMarketingPlan plan = FlyerDistributionMarketingPlan.builder()
                            .id(bgpId)
                            .userId(id)
                            .planName(request.getPlanName())
                            .startDate(request.getStartDate())
                            .endDate(request.getEndDate())
                            .priority(request.getPriority())
                            .planType(request.getPlanType())
                            .method(request.getMethod())
                            .promotion(request.getPromotion())
                            .influencer(request.getInfluencer())
                            .flyer(request.getFlyer())
                            .build();

                    flyerDistributionMarketingRepository.save(plan);
                }

            } else if ("OE".equals(request.getPlanType())) {

                //3. If Outlet Expansion, Create OutletExpansionPlan

                //Ensures that user does not have a plan name by the same planName
                if (outletExpansionPlanRepository.findByUserIdAndPlanName(id, request.getPlanName()).isPresent()) {

                    throw new IllegalArgumentException("Duplicate Plan Name");

                }

                OutletExpansionPlan plan  = OutletExpansionPlan.builder()
                        .id(bgpId)
                        .userId(id)
                        .planName(request.getPlanName())
                        .startDate(request.getStartDate())
                        .endDate(request.getEndDate())
                        .priority(request.getPriority())
                        .planType(request.getPlanType())
                        .address(request.getAddress())
                        .rentalPrice(request.getRentalPrice())
                        .renovation(request.getRenovation())
                        .staffs(request.getStaffs())
                        .build();

                outletExpansionPlanRepository.save(plan);

            } else {

                throw new Exception();

            }

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

    public Response findOne(String bgpId, String oldEmail) {

        BusinessGrowthPlan businessGrowthPlan;

        try {

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            businessGrowthPlan = find(bgpId, id);

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
//                    .message(e.getMessage())
                    .message("An unknown error has occurred! Do try again!")
                    .build();

        }

        return SingleBusinessGrowthPlanResponse.builder()
                .businessGrowthPlan(businessGrowthPlan)
                .build();
    }

    public Response findAll(String oldEmail, String order, String sortBy) {

        List<BusinessGrowthPlan> businessGrowthPlans = new ArrayList<>();

        try {

            User origUser = userRepository.findByEmail(oldEmail)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Token"));
            String id = origUser.getId();

            List<FlyerDistributionMarketingPlan> flyerDistributionMarketingList =
                    flyerDistributionMarketingRepository.findAllByUserId(id);
            List<FoodDeliveryMarketplacePlan> foodDeliveryMarketplacePlanList =
                    foodDeliveryMarketplacePlanRepository.findAllByUserId(id);
            List<OutletExpansionPlan> outletExpansionPlanList =
                    outletExpansionPlanRepository.findAllByUserId(id);
            List<PosterAndBannerMarketingPlan> posterAndBannerMarketingPlanList =
                    posterAndBannerMarketingPlanRepository.findAllByUserId(id);
            List<SocialMediaMarketingPlan> socialMediaMarketingPlanList =
                    socialMediaMarketingPlanRepository.findAllByUserId(id);

            //Add all to the main list
            businessGrowthPlans.addAll(flyerDistributionMarketingList);
            businessGrowthPlans.addAll(foodDeliveryMarketplacePlanList);
            businessGrowthPlans.addAll(outletExpansionPlanList);
            businessGrowthPlans.addAll(posterAndBannerMarketingPlanList);
            businessGrowthPlans.addAll(socialMediaMarketingPlanList);

            //Sorting based on condition
            listSorter(businessGrowthPlans, order, sortBy);

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

    public void listSorter(List<BusinessGrowthPlan> list, String order, String sortBy) {
        //Uses BubbleSort logic

        //Goes through the list n-1 times
        for (int i = 0 ; i < list.size() - 1 ; i++) {
            for (int j = 0 ; j < list.size() - i - 1 ; j++) {
                //Identify type for each
            }
        }
    }

    public BusinessGrowthPlan find(String bgpId, String userId) {

        BusinessGrowthPlan businessGrowthPlan = null;

        if (flyerDistributionMarketingRepository.findByIdAndUserId(bgpId, userId).isPresent()) {

            businessGrowthPlan = flyerDistributionMarketingRepository
                    .findByIdAndUserId(bgpId, userId)
                    .orElseThrow(() -> new IllegalArgumentException("No such Plan"));

        } else if (foodDeliveryMarketplacePlanRepository.findByIdAndUserId(bgpId, userId).isPresent()) {

            businessGrowthPlan = foodDeliveryMarketplacePlanRepository
                    .findByIdAndUserId(bgpId, userId)
                    .orElseThrow(() -> new IllegalArgumentException("No such Plan"));

        } else if (outletExpansionPlanRepository.findByIdAndUserId(bgpId, userId).isPresent()) {

            businessGrowthPlan = outletExpansionPlanRepository
                    .findByIdAndUserId(bgpId, userId)
                    .orElseThrow(() -> new IllegalArgumentException("No such Plan"));

        } else if (posterAndBannerMarketingPlanRepository.findByIdAndUserId(bgpId, userId).isPresent()) {

            businessGrowthPlan = posterAndBannerMarketingPlanRepository
                    .findByIdAndUserId(bgpId, userId)
                    .orElseThrow(() -> new IllegalArgumentException("No such Plan"));

        } else if (socialMediaMarketingPlanRepository.findByIdAndUserId(bgpId, userId).isPresent()) {

            businessGrowthPlan = socialMediaMarketingPlanRepository
                    .findByIdAndUserId(bgpId, userId)
                    .orElseThrow(() -> new IllegalArgumentException("No such Plan"));

        } else {

            throw new IllegalArgumentException("Invalid Business Growth Plan");

        }

        return businessGrowthPlan;

    }


}
