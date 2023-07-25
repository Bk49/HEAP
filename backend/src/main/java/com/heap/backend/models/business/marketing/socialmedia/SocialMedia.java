package com.heap.backend.models.business.marketing.socialmedia;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class SocialMedia {

    private String name;
    private Content[] contents;
    private Platform platform;

}
