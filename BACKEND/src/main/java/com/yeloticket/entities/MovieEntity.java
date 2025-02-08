package com.yeloticket.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


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
        private Double rating;
        private Date releaseDate;
        private Timestamp createdAt;
        private String cloudLink;

        @OneToMany(mappedBy = "movie",cascade = CascadeType.ALL)
        @JsonIgnore
        private List<ShowEntity> shows = new ArrayList<>();

        // Getters and Setters
    }

