package com.yeloticket.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.security.Timestamp;
import java.sql.Date;

@Entity
@Table(name = "tickets")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketEntity extends BaseEntity{

        private Integer totalTicketsPrice;

        private String bookedSeats;

        @CreationTimestamp
        private Date bookedAt;

        @ManyToOne
        @JoinColumn
        private ShowEntity show;

        @ManyToOne
        @JoinColumn
        private UserEntity user;

    }

