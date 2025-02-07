package com.yeloticket.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowSeatRequestDto {
    private Long showId;
    private Integer priceOfPremiumSeat;
    private Integer priceOfClassicSeat;
}
