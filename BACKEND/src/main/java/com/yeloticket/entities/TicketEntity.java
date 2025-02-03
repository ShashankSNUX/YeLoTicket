package com.yeloticket.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.security.Timestamp;

@Entity
@Table(name = "tickets")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketEntity extends BaseEntity{

        @ManyToOne
        @JoinColumn(name = "screening_id")
        private ScreeeningEntity screening;

        @ManyToOne
        @JoinColumn(name = "user_id")
        private UserEntity user;

        @ManyToOne
        @JoinColumn(name = "seat_id")
        private SeatEntity seat;

        private Timestamp bookingTime;
        private String status;

        // Getters and Setters
    }

