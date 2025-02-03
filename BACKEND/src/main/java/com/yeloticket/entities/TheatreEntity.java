package com.yeloticket.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Entity
@Table(name = "theatres")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TheatreEntity extends BaseEntity{
        private String name;
        private String location;
        private Integer totalScreens;
       // private Timestamp createdAt;

        // Getters and Setters
    }

