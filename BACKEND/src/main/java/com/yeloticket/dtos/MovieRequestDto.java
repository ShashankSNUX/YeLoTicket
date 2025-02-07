package com.yeloticket.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieRequestDto {

    private String title;
    private Integer duration;
    private Double rating;
    private Date releaseDate;
    private String genre;
    private String language;
    private String cloudLink;
}
