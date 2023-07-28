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
import com.heap.backend.repository.*;
import com.heap.backend.repository.business.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class BusinessGrowthPlanService {

    private final CommonService commonService;
    private final MenuRepository menuRepository;
    //    private final FlyerDistributionMarketingRepository flyerDistributionMarketingRepository;
//    private final FoodDeliveryMarketplacePlanRepository foodDeliveryMarketplacePlanRepository;
//    private final OutletExpansionPlanRepository outletExpansionPlanRepository;
//    private final PosterAndBannerMarketingPlanRepository posterAndBannerMarketingPlanRepository;
//    private final SocialMediaMarketingPlanRepository socialMediaMarketingPlanRepository;
    private final BusinessRepository<BusinessGrowthPlan> businessRepository;

    public Response create(CreateBusinessGrowthPlanRequest request, String oldEmail) {

        try {
            String id = commonService.getIdByEmail(oldEmail);

            //Ensures all fields have been filled (Needs work on identifying required fields)
            if (request.getPlanName() == null || request.getPlanType() == null) {
                throw new IllegalArgumentException("Missing Plan Fields");
            }

            //Ensures that user does not have a plan name by the same planName
            if (businessRepository.findByUserIdAndPlanName(id, request.getPlanName()).isPresent()) {
                throw new IllegalArgumentException("Duplicate Plan Name");
            }

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
                        .createDateTime(new HEAPDate().toString())
                        .menuId(request.getMenuId())
                        .containers(request.getContainers())
                        .build();

                businessRepository.save(plan);

            } else if ("MK".equals(request.getPlanType())) {
                //2. If Marketing, Create MarketingStrategy based on type of marketing strategy

                //Decide which type of MarketingMethod to create based on method field
                if ("SM".equals(request.getMethod())) {
                    //2.1. If Social Media, Create SocialMediaMarketingPlan

                    SocialMediaMarketingPlan plan = SocialMediaMarketingPlan.builder()
                            .userId(id)
                            .planName(request.getPlanName())
                            .startDate(request.getStartDate())
                            .endDate(request.getEndDate())
                            .priority(request.getPriority())
                            .planType(request.getPlanType())
                            .createDateTime(new HEAPDate().toString())
                            .method(request.getMethod())
                            .promotion(request.getPromotion())
                            .influencer(request.getInfluencer())
                            .socialMedia(request.getSocialMedia())
                            .build();

                    businessRepository.save(plan);

                } else if ("PB".equals(request.getMethod())) {

                    //2.2. If Poster and Banner, Create PosterAndBannerMarketingPlan

                    PosterAndBannerMarketingPlan plan = PosterAndBannerMarketingPlan.builder()
                            .userId(id)
                            .planName(request.getPlanName())
                            .startDate(request.getStartDate())
                            .endDate(request.getEndDate())
                            .priority(request.getPriority())
                            .planType(request.getPlanType())
                            .createDateTime(new HEAPDate().toString())
                            .method(request.getMethod())
                            .promotion(request.getPromotion())
                            .influencer(request.getInfluencer())
                            .posterBanner(request.getPosterBanner())
                            .build();

                    businessRepository.save(plan);

                } else if ("FD".equals(request.getMethod())) {
                    //2.3. If Flyer Distribution, Create FlyerDistributionMarketingPlan

                    FlyerDistributionMarketingPlan plan = FlyerDistributionMarketingPlan.builder()
                            .userId(id)
                            .planName(request.getPlanName())
                            .startDate(request.getStartDate())
                            .endDate(request.getEndDate())
                            .priority(request.getPriority())
                            .planType(request.getPlanType())
                            .createDateTime(new HEAPDate().toString())
                            .method(request.getMethod())
                            .promotion(request.getPromotion())
                            .influencer(request.getInfluencer())
                            .flyer(request.getFlyer())
                            .build();

                    businessRepository.save(plan);
                }

            } else if ("OE".equals(request.getPlanType())) {

                //3. If Outlet Expansion, Create OutletExpansionPlan

                OutletExpansionPlan plan = OutletExpansionPlan.builder()
                        .userId(id)
                        .planName(request.getPlanName())
                        .startDate(request.getStartDate())
                        .endDate(request.getEndDate())
                        .priority(request.getPriority())
                        .planType(request.getPlanType())
                        .createDateTime(new HEAPDate().toString())
                        .address(request.getAddress())
                        .rentalPrice(request.getRentalPrice())
                        .renovation(request.getRenovation())
                        .staffs(request.getStaffs())
                        .build();

                businessRepository.save(plan);

            } else {
                throw new Exception();
            }

        } catch (IllegalArgumentException e) {

            final String errorMsg = e.getMessage();
            String err = "Bad Request: ";
            String msg = "";

            if (errorMsg.equals("Invalid Token")) {
                //If user cannot be found in the repository based on token obtained info
                err += "Invalid Token";
                msg = "User not found";
            } else if (errorMsg.equals("Missing Plan Fields")) {
                //If fields are not completely filled
                err += "Missing Fields";
                msg += "Please ensure all fields have been filled";
            } else if (errorMsg.equals("No such Menu")) {
                //If menu cannot be found in the repository based on menuID, return ErrorResponse
                err += "Invalid Menu";
                msg += "Please ensure menu ID is valid";
            } else {
                //If Plan Name is Duplicated, return ErrorResponse
                err += "Duplicated Plan Name";
                msg += "Please ensure that plan name has not been used before";
            }
            return ErrorResponse.builder()
                    .error(err)
                    .message(msg)
                    .build();

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
            String id = commonService.getIdByEmail(oldEmail);

            if (businessRepository.findByIdAndUserId(bgpId, id).isPresent()) {
                businessRepository.deleteByUserIdAndId(id, bgpId);
            } else {
                throw new IllegalArgumentException("Invalid Business Growth Plan");
            }

        } catch (IllegalArgumentException e) {
            String err = "Bad Request: ";
            String msg = " not found";

            if ("Invalid Token".equals(e.getMessage())) {
                err += "Invalid Token";
                msg = "User" + msg;
            } else {
                err += "Invalid Business Growth Plan";
                msg = "Business Growth Plan" + msg;
            }

            return ErrorResponse.builder()
                    .error(err)
                    .message(msg)
                    .build();

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
            String id = commonService.getIdByEmail(oldEmail);

            if (businessRepository.findByUserIdAndPlanName(id, request.getPlanName()).isPresent()) {

                throw new IllegalArgumentException("Duplicate Plan Name");

            }

            //Obtain previous creationDateTime
            String createDateTime = businessRepository.findByIdAndUserId(bgpId, id)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid PlanId"))
                    .getCreateDateTime();

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
                        .createDateTime(createDateTime)
                        .build();

                businessRepository.save(plan);

            } else if ("MK".equals(request.getPlanType())) {
                //2. If Marketing, Create MarketingStrategy based on type of marketing strategy

                //Decide which type of MarketingMethod to create based on method field
                if ("SM".equals(request.getMethod())) {
                    //2.1. If Social Media, Create SocialMediaMarketingPlan

                    SocialMediaMarketingPlan plan = SocialMediaMarketingPlan.builder()
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
                            .createDateTime(createDateTime)
                            .build();

                    businessRepository.save(plan);

                } else if ("PB".equals(request.getMethod())) {

                    //2.2. If Poster and Banner, Create PosterAndBannerMarketingPlan

                    PosterAndBannerMarketingPlan plan = PosterAndBannerMarketingPlan.builder()
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
                            .createDateTime(createDateTime)
                            .build();

                    businessRepository.save(plan);

                } else if ("FD".equals(request.getMethod())) {
                    //2.3. If Flyer Distribution, Create FlyerDistributionMarketingPlan

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
                            .createDateTime(createDateTime)
                            .build();

                    businessRepository.save(plan);
                }

            } else if ("OE".equals(request.getPlanType())) {

                //3. If Outlet Expansion, Create OutletExpansionPlan

                OutletExpansionPlan plan = OutletExpansionPlan.builder()
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
                        .createDateTime(createDateTime)
                        .build();

                businessRepository.save(plan);

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
            String id = commonService.getIdByEmail(oldEmail);
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

        try {
            String id = commonService.getIdByEmail(oldEmail);

            // Decides sort by what
            Sort sort = Sort.by(sortBy.equals("priority") // Is it by priority?
                    ? "priority"
                    : sortBy.equals("urgency")  // If not by priority, is it urgency?
                        ? "urgency"
                        : "createDateTime"); // Fallback case where it is neither priority nor urgency

            // What decides sort direction
            sort = "descending".equals(order) ? sort.descending() : sort.ascending();

            // Further sort by createDateTime when the we are sorting by priority or urgency
            if(sortBy.equals("priority") || sortBy.equals("urgency")){
                sort = sort.and(Sort.by("createDateTime").descending());
            }

            List<BusinessGrowthPlan> businessGrowthPlans = businessRepository.findAllByUserId(id, sort);
            return MultipleBusinessGrowthPlanResponse.builder()
                    .businessGrowthPlans(businessGrowthPlans)
                    .build();

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
    }

    public BusinessGrowthPlan find(String bgpId, String userId) {
        Supplier<RuntimeException> expSupplier = () -> new IllegalArgumentException("No such Plan");

        BusinessGrowthPlan businessGrowthPlan = null;

        if (businessRepository.findByIdAndUserId(bgpId, userId).isPresent()) {
            businessGrowthPlan = businessRepository
                    .findByIdAndUserId(bgpId, userId)
                    .orElseThrow(expSupplier);
        } else {
            throw new IllegalArgumentException("Invalid Business Growth Plan");
        }

        return businessGrowthPlan;

    }


}
