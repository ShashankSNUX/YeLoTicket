package com.yeloticket.controller;

import com.yeloticket.dtos.DetailsDto;
import com.yeloticket.entities.TheatreEntity;
import com.yeloticket.service.TheatreService;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("")

public class DetailsController {

    @Autowired
    private TheatreService theatreService;

    @GetMapping("/details")
    public ResponseEntity<List<TheatreEntity>> getDetails(){
        return ResponseEntity.status(HttpStatus.OK).body(theatreService.getAllDetails());

    }

}
