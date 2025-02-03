package com.yeloticket.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.security.Timestamp;

@Entity
@Table(name = "payments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentEntity extends BaseEntity{

        @ManyToOne
        @JoinColumn(name = "user_id")
        private UserEntity user;

        @ManyToOne
        @JoinColumn(name = "ticket_id")
        private TicketEntity ticket;

        private BigDecimal amount;
        private Timestamp paymentDate;
        private String status;
        private String paymentMethod;

        // Getters and Setters
    }

