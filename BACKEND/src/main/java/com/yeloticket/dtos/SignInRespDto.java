package com.yeloticket.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class SignInRespDto {
    private String token;
    private String message;
}
