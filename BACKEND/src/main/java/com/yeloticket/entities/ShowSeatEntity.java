package com.yeloticket.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "show_seats")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowSeatEntity extends BaseEntity{

    private String seatNo;

    @Enumerated(value = EnumType.STRING)
    private SeatType seatType;

    private Integer price;

    private Boolean isAvailable;

    private Boolean isFoodContains;

    @ManyToOne
    @JoinColumn
    private ShowEntity show;
}
