package com.yeloticket.controller;

import com.yeloticket.dtos.BookingRequestDto;
import com.yeloticket.dtos.BookingResponseDto;
import com.yeloticket.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin("*")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/book")
    public ResponseEntity<Object> ticketBooking(@RequestBody BookingRequestDto bookingRequest) {
        try {
            BookingResponseDto result = bookingService.ticketBooking(bookingRequest);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
