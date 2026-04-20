package com.saloon.back_end.model.dto;

import com.saloon.back_end.util.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.modulith.NamedInterface;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@NamedInterface


public class UserDto {
        private String id;
        private String name;
        private String email;
        private String contactNo;
        private String address;
        private Role role;
}
