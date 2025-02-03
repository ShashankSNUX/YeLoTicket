package com.yeloticket.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "screens")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScreenEntity extends BaseEntity{

        @ManyToOne
        @JoinColumn(name = "theatre_id")
        private TheatreEntity theatre;

        private String screenNumber;
        private Integer totalSeats;

        // Getters and Setters
    }

