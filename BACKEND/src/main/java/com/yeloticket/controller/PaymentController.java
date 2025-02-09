package com.yeloticket.controller;


import com.razorpay.RazorpayException;
import com.yeloticket.service.RazorpayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private RazorpayService razorpayService;

    @PostMapping("/create-order")
    public String createOrder(@RequestParam int amount , @RequestParam String currency){

        try {
            return razorpayService.createOrder(amount, currency, "recepient_100");
        } catch (RazorpayException e) {
            throw new RuntimeException(e);
        }
    }

}