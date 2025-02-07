package com.yeloticket.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "theatres")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TheatreEntity extends BaseEntity{
        private String name;
        private String location;
    @OneToMany(mappedBy = "theatre", cascade = CascadeType.ALL)
    private List<TheatreSeatEntity> theaterSeatList = new ArrayList<>();

    @OneToMany(mappedBy = "theatre", cascade = CascadeType.ALL)
    private List<ShowEntity> showList = new ArrayList<>();
    }

