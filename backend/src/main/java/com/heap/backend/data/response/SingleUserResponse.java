package com.heap.backend.data.response;

import com.heap.backend.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SingleUserResponse implements Response {

    private User user;

}
