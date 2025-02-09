package com.yeloticket.controller;

import com.yeloticket.dtos.SignInReqDto;
import com.yeloticket.dtos.SignInRespDto;
import com.yeloticket.dtos.SignUpReqDto;
import com.yeloticket.dtos.SignUpRespDto;
import com.yeloticket.entities.UserEntity;
import com.yeloticket.entities.UserRole;
import com.yeloticket.service.UserService;
import com.yeloticket.service.UserServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/home")
public class HomeController {

    @Autowired
    private ModelMapper mapper;
    @Autowired
    private UserServiceImpl userService;
    @GetMapping()
    public ResponseEntity<String> Welcome (){
        return ResponseEntity.status(HttpStatus.OK).body("HELLO WELCOME TO YELO TICKET");

    }
    @PostMapping("/sign-up")
    public ResponseEntity<SignUpRespDto> userRegistration(@RequestBody SignUpReqDto reqDto) {

        UserEntity user = mapper.map(reqDto, UserEntity.class);
        user.setRole(UserRole.USER);
        SignUpRespDto response = new SignUpRespDto(userService.registerUser(user));
        return ResponseEntity.status(HttpStatus.OK).body(response);
}

@PostMapping("/login")
public SignInRespDto login(@RequestBody SignInReqDto user) {
    UserEntity user1 = userService.findByUsername(user.getUsername());
        SignInRespDto signInRespDto = new SignInRespDto();
        signInRespDto.setToken(userService.verify(user.getUsername(),user.getPassword()));
        signInRespDto.setRole(user1.getRole());
        return signInRespDto;
    }
}