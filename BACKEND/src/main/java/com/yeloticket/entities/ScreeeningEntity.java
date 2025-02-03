package com.yeloticket.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "screenings")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScreeeningEntity extends BaseEntity{
        @ManyToOne
        @JoinColumn(name = "screen_id")
        private ScreenEntity screen;

        @ManyToOne
        @JoinColumn(name = "movie_id")
        private MovieEntity movie;

        private Date screeningDate;
        private Time startTime;
        private Time endTime;

        // Getters and Setters
    }

