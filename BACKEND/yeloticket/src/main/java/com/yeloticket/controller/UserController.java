package com.yeloticket.controller;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping
public class UserController {
    @GetMapping("/test")
    public ResponseEntity<String> testing(){
        return ResponseEntity.status(HttpStatus.OK).body("Testdasdhadiadb");
    }

}
