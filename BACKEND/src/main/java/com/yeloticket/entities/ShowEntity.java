package com.yeloticket.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "shows")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowEntity extends BaseEntity{

        private Time time;

        private Date date;

        @ManyToOne
        @JoinColumn(name="movie_id")
        private MovieEntity movie;

        @ManyToOne
        @JoinColumn(name = "theatre_id")
        private TheatreEntity theatre;

        @OneToMany(mappedBy = "show", cascade = CascadeType.ALL)
        private List<ShowSeatEntity> showSeatList = new ArrayList<>();

        @OneToMany(mappedBy = "show", cascade = CascadeType.ALL)
        private List<TicketEntity> ticketList = new ArrayList<>();

    }

