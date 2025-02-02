package com.yeloticket.service;

import com.yeloticket.entities.UserEntity;

public interface UserService {

    String registerUser(UserEntity user);

    UserEntity findByUsername(String userName);

    String verify(String username , String password);
}