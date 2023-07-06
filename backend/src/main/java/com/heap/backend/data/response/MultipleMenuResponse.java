package com.heap.backend.data.response;

import com.heap.backend.models.Menu;
import com.heap.backend.models.Recipe;
import com.heap.backend.models.ReturnedMenu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MultipleMenuResponse implements Response {

    private List<ReturnedMenu> returnedMenus;

}
