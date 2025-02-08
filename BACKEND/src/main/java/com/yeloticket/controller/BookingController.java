package com.yeloticket.controller;

import com.yeloticket.dtos.BookingRequestDto;
import com.yeloticket.dtos.BookingResponseDto;
import com.yeloticket.entities.ShowEntity;
import com.yeloticket.entities.ShowSeatEntity;
import com.yeloticket.service.BookingService;
import com.yeloticket.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping
@CrossOrigin("*")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @Autowired
    private ShowService showService;

    @PostMapping("/book")
    public ResponseEntity<Object> ticketBooking(@RequestBody BookingRequestDto bookingRequest, HttpServletRequest req) {
        try {
            BookingResponseDto result = bookingService.ticketBooking(bookingRequest, req);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/shows/{id}")
    public ResponseEntity<List<ShowEntity>> shows (@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(showService.getAll(id));

    }

    @GetMapping("/show-seats/{id}")
    public ResponseEntity<List<ShowSeatEntity>> showSeats (@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(showService.getById(id));

    }
}
