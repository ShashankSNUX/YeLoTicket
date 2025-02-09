package com.yeloticket.dtos;

import com.yeloticket.entities.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInRespDto {
    private String token;
    private UserRole role;

}
