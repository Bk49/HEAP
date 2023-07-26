package com.heap.backend.data.response.user;

import com.heap.backend.data.response.Response;
import com.heap.backend.models.user.User;
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
