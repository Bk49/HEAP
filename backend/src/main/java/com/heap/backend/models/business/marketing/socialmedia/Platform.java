package com.heap.backend.models.business.marketing.socialmedia;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class Platform {

    private double cost;
    private double rate;
    private double duration;

}
