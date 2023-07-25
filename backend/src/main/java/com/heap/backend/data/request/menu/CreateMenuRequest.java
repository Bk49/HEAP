package com.heap.backend.data.request.menu;

import com.heap.backend.models.menu.MenuSection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateMenuRequest {
    private String name;
    private MenuSection[] sections;
    private String type;
    private String image;
}
