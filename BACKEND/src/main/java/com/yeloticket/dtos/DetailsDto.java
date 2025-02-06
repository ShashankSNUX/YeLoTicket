package com.yeloticket.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class DetailsDto {
    private List<String> locations;
    private List<String> cinemas;
}
