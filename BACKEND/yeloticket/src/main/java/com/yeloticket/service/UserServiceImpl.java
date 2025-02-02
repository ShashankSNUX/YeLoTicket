package com.yeloticket.service;

import com.yeloticket.entities.UserEntity;
import com.yeloticket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    private PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;

    @Override
    public UserEntity findByUsername(String userName) {
//        System.out.println("UserName : " + userName);
        System.out.println(userRepository.findByUsername(userName));
        return userRepository.findByUsername(userName);
    }

    @Override
    public String registerUser(UserEntity userReg) {
        boolean user = userRepository.findByEmail(userReg.getEmail()).isPresent();
        if(user) {
            return "Email Already Exists!!";
        }
        userReg.setPassword(encoder.encode(userReg.getPassword()));
        userRepository.save(userReg);
        return "User Registered Successfully!!";

}
    @Override
    public String verify(String username , String password) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(username);
        } else {
            return "fail";
        }
    }
}