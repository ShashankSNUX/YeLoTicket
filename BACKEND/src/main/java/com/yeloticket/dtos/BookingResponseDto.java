package com.yeloticket.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponseDto {

    private Time time;
    private Date date;
    private String movieName;
    private String theaterName;
    private String location;
    private String bookedSeats;
    private Integer totalPrice;
}
