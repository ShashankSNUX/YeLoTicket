package com.yeloticket.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name = "theatre_seats")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TheatreSeatEntity extends BaseEntity{

    private String seatNo;

    @Enumerated(value = EnumType.STRING)
    private SeatType seatType;

    @ManyToOne
    @JoinColumn
    private TheatreEntity theatre;
}
