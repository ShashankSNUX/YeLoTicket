package com.yeloticket.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;


@Entity
@Table(name = "movies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieEntity extends BaseEntity {
        private String title;
        private Integer duration;
        private String language;
        private String genre;
        private BigDecimal rating;
        private Date releaseDate;
        private Timestamp createdAt;

        // Getters and Setters
    }

