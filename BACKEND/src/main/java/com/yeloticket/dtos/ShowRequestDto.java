package com.yeloticket.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowRequestDto {
    private Time showStartTime;
    private Date showDate;
    private Long theaterId;
    private Long movieId;
}
