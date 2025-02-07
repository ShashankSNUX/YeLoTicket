package com.yeloticket.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
@Entity
@Table(name = "seats")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeatEntity extends BaseEntity{

        @ManyToOne
        @JoinColumn(name = "screen_id")
        private ShowEntity screen;

        private String seatNumber;
        private String seatType;
        private BigDecimal priceMultiplier;

        // Getters and Setters
    }

