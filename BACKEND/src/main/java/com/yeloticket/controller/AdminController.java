package com.yeloticket.controller;

import com.yeloticket.dtos.*;
import com.yeloticket.service.MovieService;
import com.yeloticket.service.ShowService;
import com.yeloticket.service.TheatreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private ShowService showService;

    @Autowired
    private MovieService movieService;

    @Autowired
    private TheatreService theatreService;

    @PostMapping("/addShow")
    public ResponseEntity<String> addShow(@RequestBody ShowRequestDto showRequest) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(showService.addShow(showRequest));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/addMovie")
    public ResponseEntity<String> addMovie(@RequestBody MovieRequestDto movieRequest) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(movieService.addMovie(movieRequest));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/addTheatre")
    public ResponseEntity<String> addTheatre(@RequestBody TheatreRequestDto theatreRequest) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(theatreService.addTheater(theatreRequest));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/addTheaterSeat")
    public ResponseEntity<String> addTheaterSeat(@RequestBody TheatreSeatRequest entryDto) {
        try {
            String result = theatreService.addTheaterSeat(entryDto);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/associateSeats")
    public ResponseEntity<String> associateShowSeats(@RequestBody ShowSeatRequestDto showSeatRequest) {
        try {
            String result = showService.associateShowSeats(showSeatRequest);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    @DeleteMapping("/deleteShow/{id}")
    public ResponseEntity<String> deleteShow(@PathVariable Long id) {
        try {
            String result = showService.deleteShow(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
